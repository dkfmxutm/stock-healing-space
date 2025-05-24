import React from 'react';
import { Card, CardContent, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowDropUp, ArrowDropDown } from '@mui/icons-material';
import { usePortfolio } from '../contexts/PortfolioContext';

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

const PortfolioSummary: React.FC = () => {
  const { holdings } = usePortfolio();

  const calculateTotalValue = () => {
    return holdings.reduce((total, holding) => {
      return total + (holding.quantity * holding.averagePrice);
    }, 0);
  };

  const calculateTotalReturn = () => {
    const totalInvestment = holdings.reduce((total, holding) => {
      return total + (holding.quantity * holding.averagePrice);
    }, 0);
    
    const currentValue = holdings.reduce((total, holding) => {
      // 실제 구현시 현재 시장 가격을 API로 가져와야 합니다
      const mockCurrentPrice = holding.averagePrice * (1 + (Math.random() * 0.2 - 0.1)); // -10% ~ +10% 변동
      return total + (holding.quantity * mockCurrentPrice);
    }, 0);

    return {
      value: currentValue - totalInvestment,
      percent: ((currentValue - totalInvestment) / totalInvestment) * 100,
    };
  };

  const totalValue = calculateTotalValue();
  const totalReturn = calculateTotalReturn();

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
          내 포트폴리오 현황
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'background.default',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                총 자산
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                }}
              >
                {totalValue.toLocaleString()}원
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                p: 2,
                backgroundColor: 'background.default',
                borderRadius: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 0.5,
                }}
              >
                총 수익률
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: totalReturn.value >= 0 ? '#00A86B' : '#FF4842',
                }}
              >
                {totalReturn.value >= 0 ? <ArrowDropUp /> : <ArrowDropDown />}
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {Math.abs(totalReturn.value).toLocaleString()}원
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      ml: 1,
                      fontWeight: 600,
                    }}
                  >
                    ({Math.abs(totalReturn.percent).toFixed(2)}%)
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Grid>
          {holdings.slice(0, 4).map((holding) => (
            <Grid item xs={12} sm={6} key={holding.id}>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: 'background.default',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 600,
                    color: 'text.secondary',
                    mb: 0.5,
                  }}
                >
                  {holding.name}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontWeight: 600,
                  }}
                >
                  {holding.quantity}주 × {holding.averagePrice.toLocaleString()}원
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default PortfolioSummary; 