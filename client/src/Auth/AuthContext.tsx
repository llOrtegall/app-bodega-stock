import { createContext, useContext, useEffect, useState } from 'react'
import { type User } from '../types/Interfaces'
import axios from 'axios'
import { APP_NAME, LOGIN_URL } from '../utils/constans'

interface InterfaceAuthContext {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInitialState: User = { id: '', names: '', lastnames: '', username: '', email: '', company: '', process: '', sub_process: '', app: 'bodega-stock' }

const AuthContext = createContext<InterfaceAuthContext | undefined>({
  user: UserInitialState,
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {}
})

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User>(UserInitialState)

  useEffect(() => {
    const cookie = document.cookie

    if (!cookie && cookie.split('=')[0] !== APP_NAME) {
      setIsAuthenticated(false)
      setUser(UserInitialState)
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
          setUser(UserInitialState)
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
