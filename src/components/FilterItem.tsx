import { Checkbox, FormControlLabel } from '@mui/material';

type FilterItemProps = {
  title: string;
  name: string;
  value: boolean;
  handleChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

const FilterItem = ({ title, name, value, handleChange }: FilterItemProps) => (
  <FormControlLabel
    control={<Checkbox name={name} checked={value} onChange={handleChange} />}
    label={title}
    disableTypography
  />
);

export default FilterItem;
