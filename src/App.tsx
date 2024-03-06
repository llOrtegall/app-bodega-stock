import { Routes, Route } from "react-router-dom";


import { ProtectedRoute } from "./components/ProtectedRoute";


import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'
import { useAuth } from "./Auth/AuthContext";
import axios from "axios";

export function App() {
  const { user } = useAuth();

  axios.defaults.baseURL = 'http://172.20.1.216:4002/api';

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={true} children />}>
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
