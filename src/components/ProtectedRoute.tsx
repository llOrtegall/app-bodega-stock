import { User } from '../interfaces/User';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  user: User | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <>{children}</>;
}