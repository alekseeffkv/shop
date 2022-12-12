import { Checkbox, FormControlLabel } from '@mui/material';

type FilterItemProps = {
  title: string;
  code: string;
  value: boolean;
  handleChange(): void;
};

const FilterItem = ({ title, code, value, handleChange }: FilterItemProps) => (
  <FormControlLabel
    control={<Checkbox name={code} checked={value} onChange={handleChange} />}
    label={title}
    disableTypography
  />
);

export default FilterItem;
