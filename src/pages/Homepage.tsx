import { useEffect, useState } from 'react';
import { Box, Container, styled } from '@mui/material';
import { getProducts } from '../api';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

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
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <GridBox>
        <Filter />

        <ProductsGrid>
          {products.map(({ id, title, image }) => (
            <ProductCard
              key={id}
              title={title}
              image={image}
              brand="Brand 1"
              price="27 USD"
            />
          ))}
        </ProductsGrid>
      </GridBox>
    </Container>
  );
};

export default Homepage;
