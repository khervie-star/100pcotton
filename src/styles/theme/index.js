import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#B22222',
      sub: "#7C0A02",
    },
    secondary: {
      main: '#ffffff',
    },
    background: {
      main: '#fff8f8',
    },
    buttonBackground: {
      main: "#cd4022",
      light: "#d84d22",
    },
    borderColor: {
      main: "#E25822",
    },
    text: {
      main: "#B42A2A",
      secondary: "#BDBDBD"
    },
    boxShadow: {
      main: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    },
    dividerYellow: {
      main: "#f1bc31"
    },
    textGray: {
      main: "#707070",
    },
    textColor: {
      main: "#E25822",
    },
    hover: {
      background: "#fffafa",
      color: "#E25822"
    }
  },
  typography: {
    fontFamily: [
      'poppins',
      'sans-serif',
    ].join(','),
  },
});

export default theme;
