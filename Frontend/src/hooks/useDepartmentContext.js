import { useContext } from 'react';
import { DepartmentContext } from '..Contexts/DepartmentContext.js';

export const useDepartmentContext = () => {
  const context = useContext(DepartmentContext);
  if (!context) {
    throw new Error('useDepartmentContext must be used within a DepartmentProvider');
  }
  return context;
};