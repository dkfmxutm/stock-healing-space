import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useDiary } from '../contexts/DiaryContext';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 20,
  boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const getMoodInfo = (mood: string) => {
  const moodMap: { [key: string]: { emoji: string, label: string, color: string } } = {
    positive: { emoji: '😊', label: '긍정적', color: '#00A86B' },
    neutral: { emoji: '😌', label: '평온함', color: '#646F7C' },
    worried: { emoji: '😟', label: '걱정됨', color: '#FF9800' },
    negative: { emoji: '😔', label: '부정적', color: '#F44336' },
  };
  return moodMap[mood] || moodMap.neutral;
};

const DiaryList: React.FC = () => {
  const { entries, deleteEntry } = useDiary();

  if (entries.length === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          아직 작성된 일기가 없습니다.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography 
        variant="h6" 
        sx={{ 
          p: 2, 
          fontWeight: 700,
          color: 'text.primary',
          letterSpacing: '-0.02em',
        }}
      >
        나의 투자 일기
      </Typography>
      {entries.map((entry) => {
        const moodInfo = getMoodInfo(entry.mood);
        return (
          <StyledCard key={entry.id}>
            <CardContent>
              <Stack 
                direction="row" 
                alignItems="center" 
                justifyContent="space-between"
                sx={{ mb: 2 }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Typography 
                    variant="subtitle1" 
                    sx={{ 
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {entry.date}
                  </Typography>
                  <Chip
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <span>{moodInfo.emoji}</span>
                        <span>{moodInfo.label}</span>
                      </Box>
                    }
                    sx={{
                      backgroundColor: `${moodInfo.color}15`,
                      color: moodInfo.color,
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                </Stack>
                <IconButton
                  onClick={() => deleteEntry(entry.id)}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'error.main',
                      backgroundColor: 'error.light',
                    },
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'text.secondary',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.7,
                }}
              >
                {entry.entry}
              </Typography>
            </CardContent>
          </StyledCard>
        );
      })}
    </Box>
  );
};

export default DiaryList; 