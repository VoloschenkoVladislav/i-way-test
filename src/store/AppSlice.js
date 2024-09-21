import Cookies from 'js-cookie';
import { createSlice } from '@reduxjs/toolkit';
import { appAPI } from './AppService';

const initialState = {
  accessToken: Cookies.get('access_token') || null,
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(appAPI.endpoints.login.matchFulfilled, (state, action) => {
        if (action.payload) {
          const { token } = action.payload;
          state.accessToken = `Bearer ${token}`;
          Cookies.set('access_token', `Bearer ${token}`);
        }
      })
  }
});

export default appSlice.reducer;
