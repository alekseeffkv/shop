import { configureStore } from '@reduxjs/toolkit';
import { shopApi } from './shopApi';
import orderReducer from './orderSlice';

export const store = configureStore({
  reducer: {
    [shopApi.reducerPath]: shopApi.reducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
