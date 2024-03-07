import { Routes, Route } from "react-router-dom";


import { ProtectedRoute } from "./components/ProtectedRoute";


import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'
import { useAuth } from "./Auth/AuthContext";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = 'http://172.20.1.216:4002/api';

export function App() {
  const { user, login, logout } = useAuth();

  // useEffect(() => {
  //   const token = localStorage?.getItem('bodega');
  //   if (token) {
  //     axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
  //       .then(response => {
  //         if (response.status === 200) {
  //           login({ auth: true, token: response.data.token })
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err)
  //         logout()
  //       })
  //   }else{
  //     console.log('No Existe Token');
  //     logout()
  //   }
  // }, [user]);

  return (
    <>
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
