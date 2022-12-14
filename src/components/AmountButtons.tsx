import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, ButtonGroup, IconButton } from '@mui/material';

type AmountButtonsProps = {
  amount: number;
  decrement(): void;
  increment(): void;
};

const AmountButtons = ({
  amount,
  decrement,
  increment,
}: AmountButtonsProps) => {
  return (
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
  );
};

export default AmountButtons;
