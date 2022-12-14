import { Route, Routes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';
import Layout from './Layout';
import Homepage from '../pages/Homepage';
import Cartpage from '../pages/Cartpage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="cart" element={<Cartpage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
