import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Brand, Product } from '../types';

export const shopApi = createApi({
  reducerPath: 'shopApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/data' }),
  endpoints: (builder) => ({
    getBrands: builder.query<Brand[], void>({
      query: () => '/brands.json',
    }),
    getProducts: builder.query<Product[], void>({
      query: () => '/products.json',
    }),
  }),
});

export const { useGetBrandsQuery, useGetProductsQuery } = shopApi;
