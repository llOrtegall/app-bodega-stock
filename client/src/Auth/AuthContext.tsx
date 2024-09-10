import { createContext, useContext, useEffect, useState } from 'react'
import { APP_NAME, LOGIN_URL } from '../utils/constans'
import { type User } from '../types/Interfaces'
import axios from 'axios'

interface InterfaceAuthContext {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}


const AuthContext = createContext<InterfaceAuthContext | undefined>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
})

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(null)
      return
    }

    axios.get(`${LOGIN_URL}/profile`, { params: { app: APP_NAME } })
      .then(res => {
        if (res.status === 200) {
          setIsAuthenticated(true)
          setUser(res.data)
        }
      })
      .catch(error => {
        if (error.response.status === 401) {
          setIsAuthenticated(false)
          setUser(null)
        }
      })
  }, [isAuthenticated])

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): InterfaceAuthContext => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
