import type { Brand, Product } from './types';

const baseUrl = '/data';

export const getBrands = async (): Promise<Brand[]> => {
  const res = await fetch(`${baseUrl}/brands.json`);
  const data = await res.json();
  return data;
};

export const getProducts = async (): Promise<Product[]> => {
  const res = await fetch(`${baseUrl}/products.json`);
  const data = await res.json();
  return data;
};
