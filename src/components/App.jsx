import React from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import { PATHS } from '../constants/path';
import { AuthRoute } from './AuthRoute';
import { LoginWrap } from './Login';
import { Trips } from './Trips';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';

const store = setupStore();

const App = () => {
  return (
    // <div>Login</div>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={PATHS.login} element={<LoginWrap />} />
          <Route element={<AuthRoute />}>
            <Route path='/' element={<Navigate to={PATHS.trips} replace />} />
            <Route path={PATHS.trips} element={<Trips />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
