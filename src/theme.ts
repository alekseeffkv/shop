import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#00B2A4',
      },
    },
    components: {
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            '&:hover': {
              '@media (pointer: fine)': {
                color: theme.palette.grey[400],
              },
            },
            transition: theme.transitions.create('color'),
            textDecoration: 'none',
            WebkitTapHighlightColor: 'transparent',
          }),
        },
      },
    },
  }),
  { factor: 3 }
);

export default theme;
