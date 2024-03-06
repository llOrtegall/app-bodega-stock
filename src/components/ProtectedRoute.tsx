import { ProtectedRouteProps } from '../interfaces/Interfaces';
import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from './ui';
import React from 'react';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, children, redirectTo = "/login" }) => {

  if (!isAllowed) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      <NavBar />
      {children ? children : <Outlet />}
    </>
  )

}