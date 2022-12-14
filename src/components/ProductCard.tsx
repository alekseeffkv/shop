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

type ProductCardProps = Pick<Product, 'id' | 'title' | 'image'> & {
  brand: string;
  price: Price;
};

const ProductCard = ({
  id,
  title,
  image,
  brand,
  price: { currency, value },
}: ProductCardProps) => {
  const [amount, setAmount] = useState(1);

  const dispatch = useAppDispatch();

  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  const decrement = () => {
    setAmount((prevState) => prevState - 1);
  };

  const increment = () => {
    setAmount((prevState) => prevState + 1);
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
          {formatter.format(amount * value)}
        </Typography>

        <ButtonGroup
          fullWidth
          disableElevation
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <IconButton disabled={amount === 1} onClick={decrement}>
            <RemoveRoundedIcon />
          </IconButton>

          <Box typography="h6">{`${amount} шт`}</Box>

          <IconButton onClick={increment}>
            <AddRoundedIcon />
          </IconButton>
        </ButtonGroup>

        <Button
          fullWidth
          disableElevation
          variant="contained"
          onClick={() => dispatch(add({ id, amount }))}
        >
          В корзину
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
