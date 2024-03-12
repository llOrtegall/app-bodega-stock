import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFound } from './Pages'

import { useAuth } from './Auth/AuthContext';
import { useEffect } from 'react';
import axios from "axios";

import { HomePage } from "./Pages/HomePage";

import  { VerItems } from './Pages/Items/showItems'

axios.defaults.baseURL = 'http://172.20.1.110:3030/api';

export function App() {
  const { user, login } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem('tokenBodega');
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

        <Route element={<ProtectedRoute isAllowed={!!user /* true */ } children={undefined} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/items" element={<VerItems />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
