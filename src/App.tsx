import React, { useState } from 'react';
import { Container, CssBaseline, ThemeProvider, Box } from '@mui/material';
import Header from './components/Header';
import HealingBoard from './components/HealingBoard';
import DiaryManager from './components/DiaryManager';
import PortfolioManager from './components/PortfolioManager';
import MarketOverview from './components/MarketOverview';
import PortfolioSummary from './components/PortfolioSummary';
import { theme } from './theme';
import { DiaryProvider } from './contexts/DiaryContext';
import { PortfolioProvider } from './contexts/PortfolioContext';

type Page = 'home' | 'diary' | 'portfolio';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <MarketOverview />
            <PortfolioSummary />
            <HealingBoard />
          </>
        );
      case 'diary':
        return <DiaryManager />;
      case 'portfolio':
        return <PortfolioManager />;
      default:
        return (
          <>
            <MarketOverview />
            <PortfolioSummary />
            <HealingBoard />
          </>
        );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <DiaryProvider>
        <PortfolioProvider>
          <Header onPageChange={setCurrentPage} />
          <Container maxWidth="md" sx={{ py: 3 }}>
            {renderPage()}
          </Container>
        </PortfolioProvider>
      </DiaryProvider>
    </ThemeProvider>
  );
};

export default App; 