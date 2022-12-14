import { Typography } from '@mui/material';

type SubtotalProps = {
  amount: number;
  value: number;
  currency: string;
};

const Subtotal = ({ amount, value, currency }: SubtotalProps) => {
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

export default Subtotal;
