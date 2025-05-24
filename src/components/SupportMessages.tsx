import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)({
  margin: '20px',
  backgroundColor: '#FFF0F5',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
});

interface Message {
  id: number;
  text: string;
  timestamp: string;
}

const SupportMessages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      text: newMessage,
      timestamp: new Date().toLocaleString('ko-KR'),
    };

    setMessages([message, ...messages]);
    setNewMessage('');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            서로의 이야기를 나눠요
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={3}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="여러분의 이야기를 들려주세요..."
              sx={{ marginBottom: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#FFB6C1',
                '&:hover': {
                  backgroundColor: '#FF69B4',
                },
              }}
            >
              메시지 공유하기
            </Button>
          </form>
          <List sx={{ marginTop: 2 }}>
            {messages.map((message) => (
              <React.Fragment key={message.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={message.text}
                    secondary={message.timestamp}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </StyledCard>
    </Box>
  );
};

export default SupportMessages; 