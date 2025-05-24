import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 20,
  boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
}));

interface StockHolding {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
  currentPrice: number;
  returnRate: number;
}

const PortfolioOverview: React.FC = () => {
  const [holdings, setHoldings] = useState<StockHolding[]>([]);
  const [loading, setLoading] = useState(true);

  // 임시 데이터 (실제로는 API나 데이터베이스에서 가져와야 합니다)
  useEffect(() => {
    const fetchData = () => {
      const dummyData: StockHolding[] = [
        {
          symbol: '005930',
          name: '삼성전자',
          quantity: 100,
          averagePrice: 73500,
          currentPrice: 74800,
          returnRate: 1.77,
        },
        {
          symbol: '373220',
          name: 'LG에너지솔루션',
          quantity: 10,
          averagePrice: 412000,
          currentPrice: 398000,
          returnRate: -3.40,
        },
        {
          symbol: 'AAPL',
          name: '애플',
          quantity: 50,
          averagePrice: 167.25,
          currentPrice: 169.00,
          returnRate: 1.05,
        },
      ];

      setTimeout(() => {
        setHoldings(dummyData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          보유 종목 현황
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>종목명</TableCell>
                <TableCell align="right">보유수량</TableCell>
                <TableCell align="right">평균단가</TableCell>
                <TableCell align="right">현재가</TableCell>
                <TableCell align="right">수익률</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                Array.from(new Array(3)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                    <TableCell><Skeleton /></TableCell>
                  </TableRow>
                ))
              ) : (
                holdings.map((holding) => (
                  <TableRow key={holding.symbol}>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          {holding.name}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {holding.symbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {holding.quantity.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {holding.averagePrice.toLocaleString()}
                    </TableCell>
                    <TableCell align="right">
                      {holding.currentPrice.toLocaleString()}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        color: holding.returnRate >= 0 ? '#00A86B' : '#FF4D4F',
                        fontWeight: 600,
                      }}
                    >
                      {holding.returnRate >= 0 ? '+' : ''}
                      {holding.returnRate.toFixed(2)}%
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </StyledCard>
  );
};

export default PortfolioOverview; 