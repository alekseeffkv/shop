import { createSelector } from '@reduxjs/toolkit';
import { Product } from '../types';
import { shopApi } from './shopApi';
import { RootState } from './store';

const selectProductsResult = shopApi.endpoints.getProducts.select();
const selectBrandsResult = shopApi.endpoints.getBrands.select();
const selectOrder = (state: RootState) => state.order.entities;

export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderError = (state: RootState) => state.order.error;

const selectProducts = createSelector(
  selectProductsResult,
  ({ data }) =>
    data?.reduce(
      (acc, product) => ({
        ...acc,
        [product.id]: product,
      }),
      {}
    ) || {}
);

export const selectBrands = createSelector(
  selectBrandsResult,
  ({ data }) =>
    data?.reduce(
      (acc, brand) => ({
        ...acc,
        [brand.id]: brand,
      }),
      {}
    ) || {}
);

export const selectOrderProducts = createSelector(
  selectProducts,
  selectOrder,
  (products: { [key: string]: Product }, order) =>
    Object.keys(order)
      .filter((productId) => order[productId] > 0)
      .map((productId) => products[productId])
      .map((product) => ({
        product,
        amount: order[product.id],
        subtotal: order[product.id] * product.regular_price.value,
      }))
);

export const selectOrderData = createSelector(selectOrder, (order) =>
  Object.entries(order).map(([id, amount]) => ({ id, amount }))
);
