import { Box, styled } from '@mui/material';

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

export default GridBox;
