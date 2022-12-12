import type { Brand } from './types';

export const getBrands = async (): Promise<Brand[]> => {
  const res = await fetch('brands.json');
  const data = await res.json();
  return data;
};
