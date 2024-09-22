import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from '../constants/path';
import { AuthRoute } from './login/AuthRoute';
import { LoginWrap } from './login/Login';
import { Trips } from './trips/Trips';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import { HeaderMenu } from './headerMenu/HeaderMenu';

const store = setupStore();

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.login} element={<LoginWrap />} />
          <Route element={<AuthRoute />}>
            <Route path='/' element={<Navigate to={PATHS.trips} replace />} />
            <Route path={PATHS.trips} element={<HeaderMenu><Trips /></HeaderMenu>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
