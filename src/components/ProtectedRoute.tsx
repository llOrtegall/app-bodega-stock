import { Navigate } from 'react-router-dom';
import { User } from '../interfaces/User';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  user: User | null;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, user, redirectTo="/" }) => {

  if(!user) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      {children}
    </>
  )
}