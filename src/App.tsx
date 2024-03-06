import { Routes, Route } from "react-router-dom";

import { AboutPage, HomePage, DashboardPage, LoginPage, UserPage, NotFound } from './Pages'

import { NavBar } from "./components/ui";
import { useState } from "react";

interface User {
  id: number
  name: string
}

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
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/user" element={<UserPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>

  )
}
