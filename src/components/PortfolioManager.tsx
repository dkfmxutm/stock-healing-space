import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { usePortfolio } from '../contexts/PortfolioContext';
import type { Holding } from '../contexts/PortfolioContext';

const StyledCard = styled(Card)(({ theme }) => ({
  margin: theme.spacing(2),
  borderRadius: 20,
  boxShadow: '0 8px 24px rgba(0,168,107,0.08)',
}));

interface StockFormData {
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
}

const initialFormData: StockFormData = {
  symbol: '',
  name: '',
  quantity: 0,
  averagePrice: 0,
};

const PortfolioManager: React.FC = () => {
  const { holdings, addHolding, updateHolding, deleteHolding } = usePortfolio();
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<StockFormData>(initialFormData);

  const handleOpen = (holding?: Holding) => {
    if (holding) {
      setEditingId(holding.id);
      setFormData({
        symbol: holding.symbol,
        name: holding.name,
        quantity: holding.quantity,
        averagePrice: holding.averagePrice,
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateHolding({ ...formData, id: editingId });
    } else {
      addHolding(formData);
    }
    handleClose();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'averagePrice' ? Number(value) : value,
    }));
  };

  return (
    <>
      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                letterSpacing: '-0.02em',
              }}
            >
              포트폴리오 관리
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpen()}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              종목 추가
            </Button>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: 3, boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>종목코드</TableCell>
                  <TableCell>종목명</TableCell>
                  <TableCell align="right">보유수량</TableCell>
                  <TableCell align="right">평균단가</TableCell>
                  <TableCell align="right">관리</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {holdings.map((holding) => (
                  <TableRow key={holding.id}>
                    <TableCell>{holding.symbol}</TableCell>
                    <TableCell>{holding.name}</TableCell>
                    <TableCell align="right">{holding.quantity.toLocaleString()}</TableCell>
                    <TableCell align="right">{holding.averagePrice.toLocaleString()}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => handleOpen(holding)}
                        sx={{ color: 'primary.main' }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => deleteHolding(holding.id)}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {holdings.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography color="text.secondary">
                        아직 등록된 종목이 없습니다.
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </StyledCard>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>
          {editingId ? '종목 정보 수정' : '새 종목 추가'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              name="symbol"
              label="종목코드"
              value={formData.symbol}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="name"
              label="종목명"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="quantity"
              label="보유수량"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="averagePrice"
              label="평균단가"
              type="number"
              value={formData.averagePrice}
              onChange={handleInputChange}
              fullWidth
              required
            />
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleClose} sx={{ fontWeight: 600 }}>
              취소
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ fontWeight: 600 }}
            >
              {editingId ? '수정' : '추가'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PortfolioManager; 