import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Product, Price } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { add } from '../redux/orderSlice';
import AmountButtons from './AmountButtons';
import Total from './Total';

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

  const decrement = () => {
    setAmount((prevState) => (prevState > 1 ? prevState - 1 : 1));
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

        <Total amount={amount} value={value} currency={currency} />

        <AmountButtons
          amount={amount}
          decrement={decrement}
          increment={increment}
        />

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
