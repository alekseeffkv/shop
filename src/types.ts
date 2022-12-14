export type Brand = {
  id: number;
  title: string;
  sort: string;
  code: string;
};

export type Price = { currency: string; value: number };

export type Product = {
  type: string;
  id: number;
  sku: string;
  title: string;
  image: string;
  brand: number;
  regular_price: Price;
};

export type User = { name: string; tel: string };
