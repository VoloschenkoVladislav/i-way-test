import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLoginMutation } from '../store/AppService';
import { useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import './login.scss';

const LoginForm = () => {
  const [ login ] = useLoginMutation();

  const handleSubmit = ({ username, password }) => {
    login({ login: username, password });
  };

  return (
    <div className="login-form">
      <Form
        name='basic'
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete='off'
      >
        <Form.Item
          label='Логин'
          name='username'
          rules={[
            {
              required: true,
              message: 'Логин не должен быть пустым',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Пароль'
          name='password'
          rules={[
            {
              required: true,
              message: 'Пароль не должен быть пустым',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type='primary' htmlType='submit'>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export const LoginWrap = () => {
  const to = useLocation().state || '/';
  const isAuthorized = useSelector(state => !!state.appReducer.accessToken);
  return isAuthorized ? <Navigate to={to} /> : <LoginForm />;
};
