import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useGetBrandsQuery } from '../redux/shopApi';
import FilterItem from './FilterItem';

type Values = { [key: string]: boolean };

const Filter = () => {
  const [values, setValues] = useState<Values>({});

  const { data, isSuccess } = useGetBrandsQuery();

  const shouldInitialize = useRef(true);

  const handleChange = useCallback(
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevState) => ({ ...prevState, [name]: checked }));
    },
    []
  );

  useEffect(() => {
    if (isSuccess && shouldInitialize.current) {
      setValues(
        data.reduce((acc, { code }) => ({ ...acc, [code]: false }), {})
      );

      shouldInitialize.current = false;
    }
  }, [data, isSuccess]);

  return (
    <>
      {!!data?.length && !shouldInitialize.current && (
        <Box component="form" className="filter">
          <Typography variant="h6">Бренды</Typography>

          <Stack>
            {data.map(({ id, title, code }) => (
              <FilterItem
                key={id}
                title={title}
                name={code}
                value={values[code]}
                handleChange={handleChange}
              />
            ))}
          </Stack>

          <Stack spacing="0.5rem" mt="1rem">
            <Button type="submit" variant="contained">
              Применить
            </Button>
            <Button type="reset">Сбросить</Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Filter;
