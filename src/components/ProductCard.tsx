import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';

type ProductCardProps = {
  title: string;
  price: string;
  image: string;
  brand?: string;
};

const ProductCard = ({ title, price, image, brand }: ProductCardProps) => (
  <Card component="article">
    <CardMedia
      component="img"
      src={image}
      alt={title}
      sx={{ borderRadius: 1 }}
    />

    <CardContent sx={{ '& > * + *': { mt: '0.5rem!important' } }}>
      <Typography variant="h5" component="div">
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        {brand}
      </Typography>

      <Typography variant="h6" component="div">
        {price}
      </Typography>

      <ButtonGroup
        fullWidth
        disableElevation
        sx={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <IconButton>
          <RemoveRoundedIcon />
        </IconButton>

        <Box typography="h6">1 шт</Box>

        <IconButton>
          <AddRoundedIcon />
        </IconButton>
      </ButtonGroup>

      <Button fullWidth disableElevation variant="contained">
        В корзину
      </Button>
    </CardContent>
  </Card>
);

export default ProductCard;
