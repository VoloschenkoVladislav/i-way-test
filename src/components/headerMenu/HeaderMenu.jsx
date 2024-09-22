import React from 'react';
import { Layout, Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/AppSlice';

const { Header } = Layout;

export const HeaderMenu = ({ children }) => {
  const dispatch = useDispatch();
  const menuItems = [
    {
      key: '1',
      label: 'Выйти',
      onClick: () => dispatch(logout()),
    }
  ]
  return (
    <Layout>
      <Header>
        <Menu
          theme='dark'
          mode='horizontal'
          style={{ float: 'right' }}
          items={menuItems}
        />
      </Header>
      {children}
    </Layout>
  );
};
