import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  entities: { [key: string]: number };
  loading: boolean;
  loaded: boolean;
  error: unknown;
};

type Payload = { sku: string; count: number };

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
    add: (
      { entities },
      { payload: { sku, count } }: PayloadAction<Payload>
    ) => {
      entities[sku] = (entities[sku] || 0) + count;
    },
    remove: ({ entities }, { payload: { sku } }: PayloadAction<Payload>) => {
      entities[sku] = 0;
    },
  },
});

export const { add, remove } = orderSlice.actions;

export default orderSlice.reducer;
