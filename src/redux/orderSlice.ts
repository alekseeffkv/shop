import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  entities: { [key: string]: number };
  loading: boolean;
  loaded: boolean;
  error: unknown;
};

type Payload = { id: number; amount: number } | { id: number };

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
    add: ({ entities }, { payload }: PayloadAction<Payload>) => {
      if ('amount' in payload) {
        const { id, amount } = payload;
        entities[id] = (entities[id] || 0) + amount;
      }
    },
    decrement: ({ entities }, { payload: { id } }: PayloadAction<Payload>) => {
      entities[id] = entities[id] > 0 ? entities[id] - 1 : 0;
    },
    increment: ({ entities }, { payload: { id } }: PayloadAction<Payload>) => {
      entities[id] = (entities[id] || 0) + 1;
    },
  },
});

export const { add, decrement, increment } = orderSlice.actions;

export default orderSlice.reducer;
