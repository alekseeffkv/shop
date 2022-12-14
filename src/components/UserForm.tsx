import { useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { User } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { createOrder } from '../redux/orderSlice';

const initialValues = {
  name: '',
  tel: '',
};

const UserForm = () => {
  const [values, setValues] = useState<User>(initialValues);

  const dispatch = useAppDispatch();

  const { name, tel } = values;

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createOrder({ name, tel }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          name="name"
          label="Имя"
          autoComplete="name"
          size="small"
          fullWidth
          inputProps={{ tabIndex: 1 }}
          value={name}
          onChange={handleChange}
        />

        <TextField
          type="tel"
          name="tel"
          label="Номер телефона"
          autoComplete="tel"
          size="small"
          fullWidth
          required
          inputProps={{ tabIndex: 2 }}
          value={tel}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained">
          Оформить заказ
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;
