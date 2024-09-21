import React from 'react';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

export const HeaderMenu = ({ children }) => {
  const menuItems = [
    {
      key: '1',
      label: 'Выйти',
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
