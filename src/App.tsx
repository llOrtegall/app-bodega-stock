import { Routes, Route } from "react-router-dom";

import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'

import { NavBar } from "./components/ui";
import { useState } from "react";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { User } from "./interfaces/User";

export function App() {
  const [user, setUser] = useState<User | null>(null)

  const Login = () => {
    // Request done
    setUser({ id: 1, name: 'John Doe' })
  }

  const Logout = () => {
    setUser(null)
  }


  return (
    <>
      <NavBar />

      <div className="p-4">
        {user ? (
          <div>
            {/* <p>Welcome {user.name}</p> */}
            <button onClick={Logout} className="bg-red-400 p-2 rounded-md">Logout</button>
          </div>
        ) : (
          <button onClick={Login} className="bg-green-400 p-2 rounded-md">Login</button>
        )}
      </div>


      <Routes>
        <Route path="/" element={<h1>Inicio</h1>} />
        <Route path="/home" element={
          <ProtectedRoute user={user}>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}
