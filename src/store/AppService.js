import Cookies from 'js-cookie';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState()).appReducer;
    if (accessToken) {
      headers.set('Authorization', accessToken)
    }
    return headers
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    window.location.href = '/login';
    Cookies.remove('access_token');
  }
  return result;
};

export const appAPI = createApi({
  reducerPath: 'appAPI',
  baseQuery: baseQueryWithAuth,
  endpoints: build => ({
    login: build.mutation({
      query: payload => ({
        url: '/transnextgen/v3/auth/login',
        method: 'POST',
        body: {
          login: payload.login,
          password: payload.password,
        },
      }),
      transformResponse: response => ({
        token: response.result.token,
      }),
    }),
    trips: build.query({
      query: page => ({
        url: '/transnextgen/v3/orders/trips',
        method: 'GET',
        params: { page },
      }),
      transformResponse: response => response.result,
    }),
  }),
});

export const {
  useLoginMutation,
  useTripsQuery
} = appAPI;
