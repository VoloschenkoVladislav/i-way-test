import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { PATHS } from '../constants/path';
import { useSelector } from 'react-redux';


export const AuthRoute = () => {
  const location = useLocation();
  const isAuthorized = useSelector(state => !!state.appReducer.accessToken);

  return isAuthorized
    ? <Outlet />
    : <Navigate to={PATHS.login} state={location.pathname} />;
};
