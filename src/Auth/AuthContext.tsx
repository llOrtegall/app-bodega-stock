import React, { createContext, useContext, useState } from 'react'
import { type AuthProviderProps, type User } from '../interfaces/Interfaces'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface AuthContextData {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  login: (auth: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextData>(
  {
    login: () => {},
    logout: () => {},
    user: { apellidos: '', correo: '', empresa: '', id: '', nombres: '', proceso: '', rol: '', username: '' },
    setUser: () => {}
  })

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>()
  const navigate = useNavigate()

  const login = (token: string): void => {
    if (typeof token === 'string') {
      axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
        .then(response => {
          if (response.status === 200) {
            const user = response.data as User
            setUser(user)
            navigate('/home')
          }
        })
        .catch(err => {
          console.log(err)
          logout()
        })
    }
  }

  const logout = (): void => {
    setUser({ apellidos: '', correo: '', empresa: '', id: '', nombres: '', proceso: '', rol: '', username: '' })
    localStorage.removeItem('tokenBodega')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
