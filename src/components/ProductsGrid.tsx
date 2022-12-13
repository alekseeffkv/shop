import { Box, styled } from '@mui/material';

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

export default ProductsGrid;
