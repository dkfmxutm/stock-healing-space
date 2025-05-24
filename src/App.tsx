import React from 'react';
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import HealingBoard from './components/HealingBoard';
import SupportMessages from './components/SupportMessages';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Container maxWidth="md">
        <HealingBoard />
        <SupportMessages />
      </Container>
    </ThemeProvider>
  );
};

export default App; 