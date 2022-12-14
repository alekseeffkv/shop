import { Link as RouterLink } from 'react-router-dom';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {
  AppBar,
  Badge,
  Container,
  IconButton,
  Link as MuiLink,
  SvgIcon,
  Toolbar,
} from '@mui/material';
import { ReactComponent as LogoIcon } from '../static/icons/logo.svg';
import { useAppSelector } from '../redux/hooks';
import { selectOrderProducts } from '../redux/selectors';

const Navbar = () => {
  const orderProducts = useAppSelector(selectOrderProducts);
  const productsAmount = orderProducts.length;

  return (
    <AppBar position="sticky">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <MuiLink
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <SvgIcon
              component={LogoIcon}
              inheritViewBox
              sx={{ width: 'auto' }}
            />
          </MuiLink>

          <IconButton
            disabled={!productsAmount}
            component={RouterLink}
            to="/cart"
          >
            <Badge badgeContent={productsAmount} color="info">
              <ShoppingCartOutlinedIcon sx={{ color: 'common.white' }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
