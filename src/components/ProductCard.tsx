import { useState } from 'react';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { Product, Price } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { add } from '../redux/orderSlice';

type ProductCardProps = Pick<Product, 'sku' | 'title' | 'image'> & {
  brand: string;
  price: Price;
};

const ProductCard = ({
  sku,
  title,
  image,
  brand,
  price: { currency, value },
}: ProductCardProps) => {
  const [count, setCount] = useState(1);

  const dispatch = useAppDispatch();

  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  const decrement = () => {
    setCount((prevState) => prevState - 1);
  };

  const increment = () => {
    setCount((prevState) => prevState + 1);
  };

  return (
    <Card component="article">
      <CardMedia
        component="img"
        src={image}
        alt={title}
        sx={{ borderRadius: 1 }}
      />

      <CardContent sx={{ '& > * + *': { mt: '0.5rem!important' } }}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {brand}
        </Typography>

        <Typography variant="h6" component="div">
          {formatter.format(count * value)}
        </Typography>

        <ButtonGroup
          fullWidth
          disableElevation
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <IconButton disabled={count === 1} onClick={decrement}>
            <RemoveRoundedIcon />
          </IconButton>

          <Box typography="h6">{`${count} шт`}</Box>

          <IconButton onClick={increment}>
            <AddRoundedIcon />
          </IconButton>
        </ButtonGroup>

        <Button
          fullWidth
          disableElevation
          variant="contained"
          onClick={() => dispatch(add({ sku, count }))}
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
