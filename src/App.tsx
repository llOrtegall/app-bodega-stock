import { Routes, Route } from "react-router-dom";

import { AboutPage, HomePage, LoginPage, UserPage, NotFound } from './Pages'

import { NavBar } from "./components/ui";

export function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}
