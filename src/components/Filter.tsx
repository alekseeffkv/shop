import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useGetBrandsQuery } from '../redux/shopApi';
import FilterItem from './FilterItem';

type Values = { [key: string]: boolean };

const Filter = () => {
  const [values, setValues] = useState<Values>({});

  const { data, isSuccess } = useGetBrandsQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  const shouldInitialize = useRef(true);

  const handleChange = useCallback(
    ({ target: { name, checked } }: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prevState) => ({ ...prevState, [name]: checked }));
    },
    []
  );

  const handleApply = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const brandsValue = Object.entries(values)
      .reduce((acc: string[], value) => {
        if (value[1]) acc.push(value[0]);

        return acc;
      }, [])
      .join(',');

    if (brandsValue) {
      searchParams.set('brands', brandsValue);
    } else {
      searchParams.delete('brands');
    }

    searchParams.delete('page');

    setSearchParams(searchParams);
  };

  const handleReset = () => {
    const initialValues = Object.entries(values).reduce(
      (acc, value) => ({ ...acc, [value[0]]: false }),
      {}
    );

    setValues(initialValues);

    searchParams.delete('brands');
    searchParams.delete('page');

    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (isSuccess && shouldInitialize.current) {
      const brands = searchParams.get('brands')?.split(',');

      const initialValues = data.reduce((acc: Values, { code }) => {
        if (brands?.includes(code)) {
          acc[code] = true;
        } else {
          acc[code] = false;
        }

        return acc;
      }, {});

      setValues(initialValues);

      shouldInitialize.current = false;
    }
  }, [data, isSuccess, searchParams]);

  return (
    <>
      {isSuccess && !shouldInitialize.current && (
        <Box component="form" className="filter" onSubmit={handleApply}>
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
            <Button onClick={handleReset}>Сбросить</Button>
          </Stack>
        </Box>
      )}
    </>
  );
};

export default Filter;
