import React from 'react';
import { Table, Collapse, Typography } from 'antd';
import { statuses } from '../constants/statuses';
import './tripDetails.scss';

const { Title, Text } = Typography;

const Passengers = ({ passengers }) => {
  const columns = [
    {
      title: 'ID клиента',
      dataIndex: 'client_id',
      key: 'client_id',
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'ID компании',
      dataIndex: 'company_id',
      key: 'company_id',
    },   
  ]

  return (
    <Table dataSource={passengers} columns={columns} pagination={false} rowKey='client_id' />
  );
};

const DetailItem = ({ title, value }) => {
  return (
    <div className='trips-details__detail-item'>
      <Text strong>{title}</Text>
      <Text>{value}</Text>
    </div>
  );
};

export const TripDetails = props => {
  const {
    order_id,
    location_address,
    destination_address,
    status,
    passengers,
  } = props;

  const passengersCollapse = [
    {
      key: '1',
      label: 'Пассажиры',
      children: <Passengers passengers={passengers} />
    }
  ];

  return (
    <div className='trips-details'>
      <Title level={2}>Детали заказа</Title>
      <DetailItem title='ID заказа' value={order_id} />
      <DetailItem title='Адрес местоположения' value={location_address} />
      <DetailItem title='Целевой адрес' value={destination_address} />
      <DetailItem title='Статус' value={statuses[status]} />
      <Collapse items={passengersCollapse} />
    </div>
  );
}
