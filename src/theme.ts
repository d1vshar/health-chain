import { createTheme, Theme } from '@mui/material';

const primaryBlack = '#1e2020';
const primaryBorder = '#d8d8d9';
const shadow = '0px 8px 16px 8px rgba(224,224,224,1)';
// const focusShadow = '0px 8px 8px 16px rgba(224,224,224,1)';

const theme: Theme = createTheme({
  typography: {
    fontFamily: [
      'Ubuntu',
      'san-serif',
    ].join(','),
  },
  palette: {
    primary: {
      main: primaryBlack,
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
      contrastText: primaryBlack,
    },
    background: {
      default: '#f7f5f6',
      paper: '#f7f5f6',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        variant: 'contained',
        fullWidth: true,
      },
      styleOverrides: {
        contained: {
          borderRadius: '0px',
          boxShadow: 'none',
          padding: '8px 16px',
          ':hover': {
            boxShadow: shadow,
          },
          ':active': {
            boxShadow: 'none',
          },
          textTransform: 'none',
        },
        containedSecondary: {
          ':hover': {
            backgroundColor: '#ffffff',
            boxShadow: shadow,
            ':hover': {
              boxShadow: shadow,
            },
            ':active': {
              boxShadow: 'none',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `solid 2px ${primaryBorder}`,
          borderRadius: '0px',
          boxShadow: 'none',
          padding: '16px',
        },
        outlined: {
          backgroundColor: '#ffffff',
          border: 'none',
          borderRadius: '0px',
          padding: '16px',
          boxShadow: shadow,
        },
      },
    },
  },
});

export default theme;
