import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Snackbar,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDiary } from '../contexts/DiaryContext';
import MarketOverview from './MarketOverview';
import PortfolioOverview from './PortfolioOverview';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 20,
  boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  border: 'none',
  borderRadius: '12px !important',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(0, 0.5),
  '&.Mui-selected': {
    backgroundColor: 'rgba(0,168,107,0.12) !important',
    color: theme.palette.primary.main,
  },
}));

const moods = [
  { value: 'positive', label: '😊 긍정적' },
  { value: 'neutral', label: '😌 평온함' },
  { value: 'worried', label: '😟 걱정됨' },
  { value: 'negative', label: '😔 부정적' },
];

interface InvestmentDiaryProps {
  onPageChange: (page: 'home' | 'write' | 'list') => void;
}

const InvestmentDiary: React.FC<InvestmentDiaryProps> = ({ onPageChange }) => {
  const { addEntry } = useDiary();
  const [mood, setMood] = useState<'positive' | 'neutral' | 'worried' | 'negative'>('neutral');
  const [entry, setEntry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    addEntry({
      date: today,
      mood,
      entry: entry.trim(),
    });

    // Show success message
    setShowSuccess(true);

    // Reset form
    setEntry('');
    setMood('neutral');

    // Navigate to list page after a short delay
    setTimeout(() => {
      onPageChange('list');
    }, 1500);
  };

  return (
    <>
      <MarketOverview />
      <PortfolioOverview />
      <StyledCard>
        <CardContent sx={{ p: 4 }}>
          <Typography 
            variant="h6" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: '-0.02em',
              mb: 3
            }}
          >
            오늘의 투자 일기
          </Typography>

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography 
                variant="subtitle2" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 1
                }}
              >
                오늘의 투자 심정
              </Typography>
              <ToggleButtonGroup
                value={mood}
                exclusive
                onChange={(_, newMood) => newMood && setMood(newMood)}
                aria-label="투자 심정"
              >
                {moods.map((m) => (
                  <StyledToggleButton key={m.value} value={m.value} aria-label={m.label}>
                    {m.label}
                  </StyledToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              placeholder="오늘의 투자에 대한 생각을 기록해보세요..."
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!entry.trim()}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              저장하기
            </Button>
          </form>
        </CardContent>
      </StyledCard>

      <Snackbar
        open={showSuccess}
        autoHideDuration={1500}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            backgroundColor: '#00A86B',
            color: 'white',
            '& .MuiAlert-icon': {
              color: 'white',
            },
          }}
        >
          일기가 저장되었습니다
        </Alert>
      </Snackbar>
    </>
  );
};

export default InvestmentDiary; 