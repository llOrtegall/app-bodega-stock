import { Routes, Route } from "react-router-dom";

import { AboutPage, HomePage, LoginPage } from './Pages'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  )
}
