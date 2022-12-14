import { useEffect } from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import AmountButtons from '../components/AmountButtons';
import Subtotal from '../components/Subtotal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectBrands, selectOrderProducts } from '../redux/selectors';
import { shopApi } from '../redux/shopApi';
import { Brand } from '../types';
import { decrement, increment } from '../redux/orderSlice';

const Cartpage = () => {
  const dispatch = useAppDispatch();
  const orderProducts = useAppSelector(selectOrderProducts);
  const brands: { [key: string]: Brand } = useAppSelector(selectBrands);

  useEffect(() => {
    const brands = dispatch(shopApi.endpoints.getBrands.initiate());
    const products = dispatch(shopApi.endpoints.getProducts.initiate());

    return () => {
      brands.unsubscribe();
      products.unsubscribe();
    };
  }, [dispatch]);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography component="h1" variant="h3">
        Корзина
      </Typography>

      <List>
        {orderProducts.map(
          ({
            product: {
              id,
              title,
              brand,
              regular_price: { value, currency },
            },
            amount,
          }) => (
            <ListItem
              key={id}
              divider
              sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
            >
              <ListItemText
                primary={title}
                secondary={brands[brand].title}
                primaryTypographyProps={{
                  component: 'div',
                  variant: 'h5',
                  gutterBottom: true,
                }}
                sx={{ alignSelf: { xs: 'flex-start', sm: 'initial' } }}
              />

              <Stack
                flexDirection="row"
                alignItems="center"
                alignSelf={{ xs: 'flex-end', sm: 'initial' }}
              >
                <Box mr={3} minWidth="9rem">
                  <AmountButtons
                    amount={amount}
                    decrement={() => dispatch(decrement({ id }))}
                    increment={() => dispatch(increment({ id }))}
                  />
                </Box>

                <Stack
                  flexDirection="row"
                  justifyContent="flex-end"
                  minWidth="7rem"
                >
                  <Subtotal amount={amount} value={value} currency={currency} />
                </Stack>
              </Stack>
            </ListItem>
          )
        )}
      </List>
    </Container>
  );
};

export default Cartpage;
