import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1">
          주식 투자 실패 후 치유의 공간
        </Typography>
        <Typography variant="h5" sx={{ mt: 2 }}>
          여러분은 혼자가 아닙니다
        </Typography>
      </Box>
    </Container>
  );
}

export default App; 