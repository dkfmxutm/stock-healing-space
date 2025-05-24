import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  borderRadius: 20,
  boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// 임시 데이터 - 실제 구현시 API로 대체
const marketData: MarketIndex[] = [
  {
    name: 'KOSPI',
    value: 2648.76,
    change: 15.32,
    changePercent: 0.58,
  },
  {
    name: 'KOSDAQ',
    value: 873.45,
    change: -4.21,
    changePercent: -0.48,
  },
  {
    name: 'S&P 500',
    value: 4783.35,
    change: 32.45,
    changePercent: 0.68,
  },
  {
    name: 'NASDAQ',
    value: 14982.23,
    change: -28.76,
    changePercent: -0.19,
  },
];

const MarketOverview: React.FC = () => {
  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: 'primary.main',
            letterSpacing: '-0.02em',
            mb: 3,
          }}
        >
          주요 지수 현황
        </Typography>
        <Grid container spacing={3}>
          {marketData.map((index) => (
            <Grid item xs={12} sm={6} key={index.name}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 2,
                  backgroundColor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: 'text.secondary',
                      mb: 0.5,
                    }}
                  >
                    {index.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {index.value.toLocaleString()}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: index.change >= 0 ? '#00A86B' : '#FF4842',
                  }}
                >
                  {index.change >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {Math.abs(index.change).toLocaleString()} ({Math.abs(index.changePercent).toFixed(2)}%)
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default MarketOverview; 