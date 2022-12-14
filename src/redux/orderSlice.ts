import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  entities: { [key: string]: number };
  loading: boolean;
  loaded: boolean;
  error: unknown;
};

type Payload = { id: number; count: number };

const initialState: OrderState = {
  entities: {},
  loading: false,
  loaded: false,
  error: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    add: ({ entities }, { payload: { id, count } }: PayloadAction<Payload>) => {
      entities[id] = (entities[id] || 0) + count;
    },
    remove: ({ entities }, { payload: { id } }: PayloadAction<Payload>) => {
      entities[id] = 0;
    },
  },
});

export const { add, remove } = orderSlice.actions;

export default orderSlice.reducer;
