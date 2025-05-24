import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  Chip,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
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

const getMoodInfo = (mood: string) => {
  const moodMap: { [key: string]: { emoji: string, label: string, color: string } } = {
    positive: { emoji: '😊', label: '긍정적', color: '#00A86B' },
    neutral: { emoji: '😌', label: '평온함', color: '#646F7C' },
    worried: { emoji: '😟', label: '걱정됨', color: '#FF9800' },
    negative: { emoji: '😔', label: '부정적', color: '#F44336' },
  };
  return moodMap[mood] || moodMap.neutral;
};

const DiaryManager: React.FC = () => {
  const { entries, addEntry, deleteEntry } = useDiary();
  const [open, setOpen] = useState(false);
  const [mood, setMood] = useState<'positive' | 'neutral' | 'worried' | 'negative'>('neutral');
  const [entry, setEntry] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMood('neutral');
    setEntry('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!entry.trim()) return;

    const today = new Date().toISOString().split('T')[0];
    addEntry({
      date: today,
      mood,
      entry: entry.trim(),
    });

    setShowSuccess(true);
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, px: 2 }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '-0.02em',
          }}
        >
          투자 일기
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          일기 작성
        </Button>
      </Box>

      {entries.length === 0 ? (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <Typography
            color="text.secondary"
            sx={{ mb: 2, fontWeight: 500 }}
          >
            아직 작성된 일기가 없습니다.
          </Typography>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            첫 일기 작성하기
          </Button>
        </Box>
      ) : (
        entries.map((entry) => {
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
        })
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>오늘의 투자 일기</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                gutterBottom
                sx={{
                  fontWeight: 600,
                  color: 'text.secondary',
                  mb: 1,
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
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={!entry.trim()}
              sx={{ fontWeight: 600 }}
            >
              저장하기
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Snackbar
        open={showSuccess}
        autoHideDuration={2000}
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

export default DiaryManager; 