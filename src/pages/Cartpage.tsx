import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import AmountButtons from '../components/AmountButtons';
import Subtotal from '../components/Subtotal';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectBrands,
  selectOrderError,
  selectOrderLoading,
  selectOrderProducts,
} from '../redux/selectors';
import { shopApi } from '../redux/shopApi';
import { Brand } from '../types';
import { decrement, increment, reset } from '../redux/orderSlice';
import UserForm from '../components/UserForm';
import Alert from '../components/Alert';

const Cartpage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const orderProducts = useAppSelector(selectOrderProducts);
  const brands: { [key: string]: Brand } = useAppSelector(selectBrands);
  const loading = useAppSelector(selectOrderLoading);
  const error = useAppSelector(selectOrderError);

  const closeDialog = () => {
    setOpenDialog(false);

    dispatch(reset());

    navigate('/');
  };

  const closeAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;

    setOpenAlert(false);
  };

  useEffect(() => {
    const brands = dispatch(shopApi.endpoints.getBrands.initiate());
    const products = dispatch(shopApi.endpoints.getProducts.initiate());

    return () => {
      brands.unsubscribe();
      products.unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    if (loading === 'succeeded') {
      setOpenDialog(true);
    } else if (loading === 'failed') {
      setOpenAlert(true);
    }
  }, [loading]);

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

        <ListItem sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <ListItemText
            primary="Общая сумма заказа"
            primaryTypographyProps={{ component: 'div', variant: 'h5' }}
            sx={{ alignSelf: { xs: 'flex-start', sm: 'initial' } }}
          />
        </ListItem>
      </List>

      <Container maxWidth="xs" sx={{ py: 6 }}>
        <UserForm />
      </Container>

      <Dialog open={openDialog} onClose={closeDialog}>
        <DialogTitle>Заказ успешно оформлен</DialogTitle>

        <DialogActions>
          <Button onClick={closeDialog}>Закрыть</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={closeAlert}>
        <Alert onClose={closeAlert} severity="error" sx={{ width: '100%' }}>
          {error?.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cartpage;
