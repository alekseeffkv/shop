import { useMemo } from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import {
  Box,
  Container,
  Pagination,
  Stack,
  styled,
  PaginationItem,
} from '@mui/material';
import { useGetBrandsQuery, useGetProductsQuery } from '../redux/shopApi';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import { Brand } from '../types';

const PRODUCTS_PER_PAGE = 6;

const GridBox = styled(Box)(
  ({
    theme: {
      spacing,
      breakpoints: { up },
    },
  }) => ({
    display: 'grid',
    gap: spacing(6),
    '& .filter': { gridArea: 'filter' },
    '& .products': { gridArea: 'products' },
    '& .pagination': { gridArea: 'pagination' },
    [up('xs')]: {
      gridTemplateColumns: '1fr',
      gridTemplateAreas: `'filter' 'products' 'pagination'`,
    },
    [up('sm')]: {
      gridTemplateColumns: `${spacing(25)} 1fr`,
      gridTemplateAreas: `'filter products' 'filter pagination'`,
    },
  })
);

const ProductsGrid = styled(Box)(
  ({
    theme: {
      spacing,
      breakpoints: { up },
    },
  }) => ({
    display: 'grid',
    gap: spacing(3),
    [up('xs')]: { gridTemplateColumns: '1fr' },
    [up('sm')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
    [up('md')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
  })
);

const Homepage = () => {
  const { data: products } = useGetProductsQuery();
  const { data: brandsArray } = useGetBrandsQuery();

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get('page') || '1');

  const pages = products
    ? Math.ceil(products.length / PRODUCTS_PER_PAGE)
    : null;

  const lastProductIndex = page * PRODUCTS_PER_PAGE;
  const firstProductIndex = lastProductIndex - PRODUCTS_PER_PAGE;
  const currentProducts = products?.slice(firstProductIndex, lastProductIndex);

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

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <GridBox>
        <Filter />

        <ProductsGrid className="products">
          {!!currentProducts?.length &&
            currentProducts.map(
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
                    brand={brands?.[brand].title}
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
              renderItem={(item) => (
                <PaginationItem
                  component={RouterLink}
                  to={`?page=${item.page}`}
                  {...item}
                />
              )}
            />
          </Stack>
        )}
      </GridBox>
    </Container>
  );
};

export default Homepage;
