import { combineReducers, configureStore } from "@reduxjs/toolkit";
import appReducer from './AppSlice';
import { appAPI } from './AppService';

const rootReducer = combineReducers({
  appReducer,
  [appAPI.reducerPath]: appAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
          .concat(appAPI.middleware)
  })
};
