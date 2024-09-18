import { createSlice } from '@reduxjs/toolkit';

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
        if (action.payload.data) {
          const { access_token, expires } = action.payload.data;
          state.accessToken = `Bearer ${access_token}`;
          Cookies.set('access_token', `Bearer ${access_token}`, { expires: new Date(expires) });
        }
      })
  }
});

export default appSlice.reducer;
