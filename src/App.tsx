import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";

import axios from "axios";
import { useAuth } from './Auth/AuthContext';
import { useEffect } from 'react';

axios.defaults.baseURL = 'http://172.20.1.216:4002/api';

export function App() {
  const { user, login, logout } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem('bodega');
    if (token) {
      login(token);
    }else{
      console.log('No Token');
      logout()
    }
  }, [])

  return (
    <>
      {console.log(user)}
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={true} children={undefined} />}>
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
