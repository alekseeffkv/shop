import { Box, Container, styled } from '@mui/material';
import { useGetProductsQuery } from '../redux/shopApi';
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
  const { data } = useGetProductsQuery();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <GridBox>
        <Filter />

        <ProductsGrid>
          {!!data?.length &&
            data.map(({ id, title, image }) => (
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
