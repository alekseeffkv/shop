import { AlertProps, Alert as MuiAlert } from '@mui/material';
import { forwardRef } from 'react';

const Alert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default Alert;
