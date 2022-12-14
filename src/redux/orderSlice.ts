import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';
import { selectOrderData } from './selectors';
import { RootState } from './store';

type OrderState = {
  entities: { [key: string]: number };
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: unknown;
};

type Payload = { id: number; amount: number } | { id: number };

const initialState: OrderState = {
  entities: {},
  loading: 'idle',
  error: null,
};

export const createOrder = createAsyncThunk<void, User, { state: RootState }>(
  'order/create',
  async (userData, { rejectWithValue, getState }) => {
    const state = getState();
    const order = selectOrderData(state);
    const { name, tel } = userData;

    const postData = new FormData();
    postData.append('name', name);
    postData.append('tel', tel);
    postData.append('order', JSON.stringify(order));

    try {
      const response = await fetch('https://app.aaccent.su/js/confirm.php', {
        method: 'POST',
        body: postData,
      });

      const data: { result: string } = await response.json();

      if (data.result !== 'ok') {
        throw new Error('Не удалось отправить заказ');
      }
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message);
      }
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state) => {
      state.loading = 'pending';
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state) => {
      state.loading = 'succeeded';
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.payload;
    });
  },
});

export const { add, decrement, increment } = orderSlice.actions;

export default orderSlice.reducer;
