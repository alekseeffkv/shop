import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => (
  <>
    <Navbar />
    <Box component="main" flexGrow={1}>
      <Outlet />
    </Box>
  </>
);

export default Layout;
