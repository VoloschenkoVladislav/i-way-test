import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
import { appAPI } from './AppService';

const initialState = {
  accessToken: Cookies.get('access_token') || null,
  loginError: null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    logout: state => {
      state.accessToken = '';
      Cookies.remove('access_token');
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher(appAPI.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload) {
          const { token } = action.payload;
          state.accessToken = `Bearer ${token}`;
          state.loginError = null;
          Cookies.set('access_token', `Bearer ${token}`);
        }
      })
      .addMatcher(appAPI.endpoints.login.matchRejected, (state, action) => {
        if (action.payload.data.error) {
          state.loginError = action.payload.data.error.message;
        } else {
          state.loginError = 'Непредвиденная ошибка. Повторите попытку позднее.'
        }
      })
  }
});

export const { logout } = appSlice.actions;

export default appSlice.reducer;
