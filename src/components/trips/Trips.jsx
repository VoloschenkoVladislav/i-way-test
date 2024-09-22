import React, { useMemo, useRef, useState } from 'react';
import { Spin, Button, Input, Space, Table } from 'antd';
import { useTripsQuery } from '../../store/AppService';
import { SearchOutlined } from '@ant-design/icons';
import { ModalWindow } from '../modalWindow/ModalWindow';
import { TripDetails } from '../tripDetails/TripDetails';
import { statuses } from '../../constants/statuses';
import './trips.scss';

const { Column } = Table;

export const Trips = () => {
  const [ page, setPage ] = useState(1);
  const [ showTripDetails, setShowTripDetails ] = useState(false);
  const [ details, setDetails ] = useState(null);
  const { data: trips, isFetching: isTripsFetching } = useTripsQuery(page);

  const shortTripsData = useMemo(() => {
    if (trips) {
      return trips.orders.map(order => ({
        order_id: order.order_id,
        location_address: order.location_address,
        destination_address: order.destination_address,
        status: order.status,
        passengers: order.passengers,
      }));
    }
    return null;
  }, [trips]);

  const [searchText, setSearchText] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };
  const handleReset = (clearFilters, confirm) => {
    clearFilters();
    confirm();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={e => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Искать по ${title}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Фильтр
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters, confirm)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Сбросить
          </Button>
          <Button
            type='link'
            size='small'
            onClick={close}
          >
            Закрыть
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  return (
    <div>
      {
        showTripDetails
        ? <ModalWindow onClose={() => setShowTripDetails(false)}>
          <TripDetails {...details} />
        </ModalWindow>
        : null
      }
      {
        isTripsFetching
        ? <Spin className='absolute-center' />
        : <Table
          className='trips-table'
          dataSource={shortTripsData}
          pagination={{
            onChange: page => setPage(page),
            pageSize: trips.page_data.items_on_page,
            total: trips.page_data.total_items,
            showSizeChanger: false,
            current: page,
          }}
          rowKey='order_id'
          onRow={
            record => ({
              onClick: () => {
                setDetails(record);
                setShowTripDetails(true);
              }
            })
          }
        >
          <Column title='ID заказа' dataIndex='order_id' key='order_id' {...getColumnSearchProps('order_id', 'ID заказа')} />
          <Column title='Адрес местоположения' dataIndex='location_address' key='location_address' responsive={['sm']} />
          <Column title='Целевой адрес' dataIndex='destination_address' key='destination_address' responsive={['sm']} />
          <Column
            title='Статус'
            dataIndex='status'
            key='status'
            render={status => statuses[status]}
            filters={Object.keys(statuses).map(key => ({ text: statuses[key], value: key }))}
            onFilter={(value, record) => record.status.toString() === value}
          />
        </Table>
      }
    </div>
  );
};
