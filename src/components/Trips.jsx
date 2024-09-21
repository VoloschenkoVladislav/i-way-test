import React, { useMemo, useRef, useState } from 'react';
import { Spin, Button, Input, Space, Table } from 'antd';
import { useTripsQuery } from '../store/AppService';
import { SearchOutlined } from '@ant-design/icons';
import './trips.scss';

const { Column } = Table;
const statuses = {
  0: 'Ожидание обработки',
  1: 'Обработка',
  2: 'Принято',
  3: 'Завершённый',
  4: 'Отменено без штрафа',
  5: 'Отменено со штрафом',
  6: 'Неоплаченный',
  7: 'Измененный',
}

export const Trips = () => {
  const [ page, setPage ] = useState(1);
  const { data: trips, isFetching: isTripsFetching } = useTripsQuery(page);

  const shortTripsData = useMemo(() => {
    if (trips) {
      return trips.orders.map(order => ({
        order_id: order.order_id,
        location_address: order.location_address,
        destination_address: order.destination_address,
        status: order.status,
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
  const handleReset = clearFilters => {
    clearFilters();
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
        isTripsFetching
        ? <Spin className='absolute-center' />
        : <Table
          dataSource={shortTripsData}
          pagination={{
            onChange: page => setPage(page),
            pageSize: trips.page_data.items_on_page,
            total: trips.page_data.total_items,
            showSizeChanger: false,
            current: page,
          }}
          rowKey='order_id'
        >
          <Column title='ID заказа' dataIndex='order_id' key='order_id' {...getColumnSearchProps('order_id', 'ID заказа')} />
          <Column title='Адрес местоположения' dataIndex='location_address' key='location_address' />
          <Column title='Целевой адрес' dataIndex='destination_address' key='destination_address' />
          <Column title='Статус' dataIndex='status' key='status' render={status => statuses[status]} />
        </Table>
      }
    </div>
  );
};
