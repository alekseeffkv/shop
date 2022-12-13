export type Brand = {
  id: number;
  title: string;
  sort: string;
  code: string;
};

export type Product = {
  type: 'simple';
  id: number;
  sku: string;
  title: string;
  regular_price: {
    currency: 'USD';
    value: number;
  };
  image: string;
  brand: number;
};
