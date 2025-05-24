import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const messages = [
  "주식시장의 하락은 일시적입니다. 더 나은 내일이 올 거예요.",
  "투자는 마라톤입니다. 꾸준히 가는 것이 중요해요.",
  "모든 위기 뒤에는 기회가 있습니다.",
  "당신의 결정을 믿으세요. 시간이 해결해 줄 거예요.",
  "지금의 어려움은 미래의 성공을 위한 교훈이 될 거예요.",
];

const HealingBoard: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {
    const changeMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
    };

    changeMessage();
    const interval = setInterval(changeMessage, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledCard>
      <CardContent sx={{ p: 4 }}>
        <Typography 
          variant="h6" 
          component="div" 
          gutterBottom 
          align="center"
          sx={{ 
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            mb: 2
          }}
        >
          오늘의 응원 메시지
        </Typography>
        <Typography 
          variant="body1" 
          align="center" 
          sx={{ 
            fontWeight: 500,
            color: 'text.primary',
            letterSpacing: '-0.01em',
            lineHeight: 1.8
          }}
        >
          {currentMessage}
        </Typography>
      </CardContent>
    </StyledCard>
  );
};

export default HealingBoard; 