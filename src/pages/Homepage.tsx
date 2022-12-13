import { useMemo } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import { Container, Pagination, Stack, PaginationItem } from '@mui/material';
import { useGetBrandsQuery, useGetProductsQuery } from '../redux/shopApi';
import { Brand } from '../types';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import GridBox from '../components/GridBox';
import ProductsGrid from '../components/ProductsGrid';

const PRODUCTS_PER_PAGE = 6;

const Homepage = () => {
  const { data: products } = useGetProductsQuery();
  const { data: brandsArray } = useGetBrandsQuery();

  const [searchParams] = useSearchParams();

  const brands: { [key: string]: Brand } | undefined = useMemo(
    () =>
      brandsArray?.reduce(
        (acc, brand) => ({
          ...acc,
          [brand.id]: brand,
        }),
        {}
      ),
    [brandsArray]
  );

  const filteredBrands = searchParams.get('brands')?.split(',');

  const filteredProducts = filteredBrands
    ? products?.filter(({ brand }) =>
        filteredBrands.includes(brands?.[brand].code || '')
      )
    : products;

  const page = Number(searchParams.get('page') || '1');

  const pages = filteredProducts
    ? Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
    : null;

  const lastProductIndex = page * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const paginatedProducts = filteredProducts?.slice(
    firstProductIndex,
    lastProductIndex
  );

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <GridBox>
        <Filter />

        <ProductsGrid className="products">
          {!!paginatedProducts?.length &&
            brands &&
            paginatedProducts.map(
              ({
                id,
                title,
                image,
                brand,
                regular_price: { currency, value },
              }) => {
                const formatter = new Intl.NumberFormat('ru', {
                  style: 'currency',
                  currency,
                  minimumFractionDigits: 2,
                });

                return (
                  <ProductCard
                    key={id}
                    title={title}
                    image={image}
                    brand={brands[brand].title}
                    price={formatter.format(value)}
                  />
                );
              }
            )}
        </ProductsGrid>

        {pages && pages > 1 && (
          <Stack
            justifyContent="center"
            alignItems="center"
            className="pagination"
          >
            <Pagination
              boundaryCount={0}
              count={pages}
              page={page}
              renderItem={(item) => {
                searchParams.set('page', String(item.page));

                return (
                  <PaginationItem
                    component={RouterLink}
                    to={`?${searchParams.toString()}`}
                    {...item}
                  />
                );
              }}
            />
          </Stack>
        )}
      </GridBox>
    </Container>
  );
};

export default Homepage;
