import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface DiaryEntry {
  id: string;
  date: string;
  mood: 'positive' | 'neutral' | 'worried' | 'negative';
  entry: string;
}

interface DiaryContextType {
  entries: DiaryEntry[];
  addEntry: (entry: Omit<DiaryEntry, 'id'>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
}

const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export const DiaryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const userId = 'default-user'; // 실제 구현시 인증 시스템에서 가져와야 함

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/diary/${userId}`);
        const formattedEntries = response.data.map((entry: any) => ({
          id: entry._id,
          date: new Date(entry.date).toISOString().split('T')[0],
          mood: entry.mood,
          entry: entry.entry,
        }));
        setEntries(formattedEntries);
      } catch (error) {
        console.error('Failed to fetch diary entries:', error);
      }
    };

    fetchEntries();
  }, []);

  const addEntry = async (newEntry: Omit<DiaryEntry, 'id'>) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/diary/${userId}`, newEntry);
      const savedEntry = {
        id: response.data._id,
        date: new Date(response.data.date).toISOString().split('T')[0],
        mood: response.data.mood,
        entry: response.data.entry,
      };
      setEntries(prev => [savedEntry, ...prev]);
    } catch (error) {
      console.error('Failed to add diary entry:', error);
      throw error;
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/diary/${userId}/${id}`);
      setEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      console.error('Failed to delete diary entry:', error);
      throw error;
    }
  };

  return (
    <DiaryContext.Provider value={{ entries, addEntry, deleteEntry }}>
      {children}
    </DiaryContext.Provider>
  );
};

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (context === undefined) {
    throw new Error('useDiary must be used within a DiaryProvider');
  }
  return context;
}; 