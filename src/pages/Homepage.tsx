import { useMemo } from 'react';
import { Box, Container, styled } from '@mui/material';
import { useGetBrandsQuery, useGetProductsQuery } from '../redux/shopApi';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';
import { Brand } from '../types';

const GridBox = styled(Box)(
  ({
    theme: {
      spacing,
      breakpoints: { up },
    },
  }) => ({
    display: 'grid',
    gap: spacing(6),
    [up('xs')]: { gridTemplateColumns: '1fr' },
    [up('sm')]: { gridTemplateColumns: `${spacing(25)} 1fr` },
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

        <ProductsGrid>
          {!!products?.length &&
            products.map(
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
      </GridBox>
    </Container>
  );
};

export default Homepage;
