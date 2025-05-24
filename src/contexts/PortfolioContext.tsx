import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface Holding {
  id: string;
  symbol: string;
  name: string;
  quantity: number;
  averagePrice: number;
}

interface PortfolioContextType {
  holdings: Holding[];
  addHolding: (holding: Omit<Holding, 'id'>) => Promise<void>;
  updateHolding: (holding: Holding) => Promise<void>;
  deleteHolding: (id: string) => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const userId = 'default-user'; // 실제 구현시 인증 시스템에서 가져와야 함

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/portfolio/${userId}`);
        setHoldings(response.data.holdings || []);
      } catch (error) {
        console.error('Failed to fetch portfolio:', error);
      }
    };

    fetchHoldings();
  }, []);

  const updatePortfolio = async (newHoldings: Holding[]) => {
    try {
      await axios.put(`http://localhost:5000/api/portfolio/${userId}`, {
        holdings: newHoldings,
      });
    } catch (error) {
      console.error('Failed to update portfolio:', error);
      throw error;
    }
  };

  const addHolding = async (holding: Omit<Holding, 'id'>) => {
    const newHolding = { ...holding, id: Date.now().toString() };
    const newHoldings = [...holdings, newHolding];
    setHoldings(newHoldings);
    await updatePortfolio(newHoldings);
  };

  const updateHolding = async (updatedHolding: Holding) => {
    const newHoldings = holdings.map(holding =>
      holding.id === updatedHolding.id ? updatedHolding : holding
    );
    setHoldings(newHoldings);
    await updatePortfolio(newHoldings);
  };

  const deleteHolding = async (id: string) => {
    const newHoldings = holdings.filter(holding => holding.id !== id);
    setHoldings(newHoldings);
    await updatePortfolio(newHoldings);
  };

  return (
    <PortfolioContext.Provider value={{ holdings, addHolding, updateHolding, deleteHolding }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}; 