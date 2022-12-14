import { Typography } from '@mui/material';

type TotalProps = {
  amount: number;
  value: number;
  currency: string;
};

const Total = ({ amount, value, currency }: TotalProps) => {
  const formatter = new Intl.NumberFormat('ru', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  });

  return (
    <Typography variant="h6" component="div">
      {formatter.format(amount * value)}
    </Typography>
  );
};

export default Total;
