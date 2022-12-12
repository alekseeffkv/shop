import { useCallback, useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { Brand } from '../types';
import { getBrands } from '../api';
import FilterItem from './FilterItem';

type Values = { [key: string]: boolean };

const Filter = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [values, setValues] = useState<Values>({});

  const handleChange = useCallback(
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevState) => ({ ...prevState, [name]: checked }));
    },
    []
  );

  useEffect(() => {
    getBrands()
      .then((res) => {
        setBrands(res);

        setValues(
          res.reduce((acc, { code }) => ({ ...acc, [code]: false }), {})
        );
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box component="form">
      <Typography variant="h6">Бренды</Typography>

      <Stack>
        {brands.map(({ id, title, code }) => (
          <FilterItem
            key={id}
            title={title}
            name={code}
            value={values[code]}
            handleChange={handleChange}
          />
        ))}
      </Stack>

      <Stack mt="1rem">
        <Button type="submit" variant="contained">
          Применить
        </Button>
        <Button type="reset">Сбросить</Button>
      </Stack>
    </Box>
  );
};

export default Filter;
