import { Routes, Route } from "react-router-dom";


import { ProtectedRoute } from "./components/ProtectedRoute";


import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'

export function App() {

  return (
    <>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<h1>Inicio</h1>} />

        <Route element={<ProtectedRoute isAllowed={!!user} children={undefined}  />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/about" element={
          <ProtectedRoute isAllowed={!!user && user.permissions.includes('admin')} redirectTo="/home">
            <AboutPage />
          </ProtectedRoute>
        } />

        <Route path="/user" element={<UserPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}
