import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00A86B',  // 세련된 그린
      light: '#2EBD84',
      dark: '#008F5D',
    },
    secondary: {
      main: '#1B3C35',  // 딥 그린
      light: '#2A4D45',
      dark: '#0F2D27',
    },
    background: {
      default: '#F8FAF9',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1B3C35',
      secondary: '#5C7C76',
    },
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    body1: {
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 20px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
  },
}); 