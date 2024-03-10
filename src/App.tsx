import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import { useAuth } from './Auth/AuthContext';
import { useEffect } from 'react';
import axios from "axios";

axios.defaults.baseURL = 'http://172.20.1.216:4002/api';

export function App() {
  const { user, login } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem('bodega');
    if (token) {
      login(token);
    } else {
      console.log('No Token');
    }
  }, [])
 
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={ /* !!user */ true } children={undefined} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/user" element={<UserPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
