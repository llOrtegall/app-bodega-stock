import { Routes, Route } from "react-router-dom";


import { ProtectedRoute } from "./components/ProtectedRoute";


import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'
import { useAuth } from "./Auth/AuthContext";

export function App() {
  const { user } = useAuth();

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
