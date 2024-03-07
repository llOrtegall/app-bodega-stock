import { Routes, Route } from "react-router-dom";

import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'

import { NavBar } from "./components/ui";

export function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}
