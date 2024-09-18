import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { BASE_BACKEND_URL } from '../constants/api';

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_BACKEND_URL}${API_PATH}`,
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
      query: requestBody => ({
        url: '/v3/auth/login',
        method: 'POST',
        body: {
          email: requestBody.email,
          password: requestBody.password,
        },
        formData: true,
      }),
    }),
    trips: build.query({
      query: () => ({
        url: '/v3/orders/trips',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLazyTripsQuery
} = appAPI;
