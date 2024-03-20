import React, { createContext, useContext, useState } from 'react'
import { getProfile } from '../services/Login.services'
import { type User } from '../types/Interfaces'
import { useNavigate } from 'react-router-dom'

interface InterfaceAuthContext {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  login: (token: string) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

const InitialUser: User = { apellidos: '', correo: '', empresa: '', id: '', nombres: '', proceso: '', rol: '', username: '', exp: 0, iat: 0 }

const AuthContext = createContext<InterfaceAuthContext>(
  {
    login: () => {},
    logout: () => {},
    user: InitialUser,
    setUser: () => {}
  })

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(InitialUser)
  const navigate = useNavigate()

  const login = (token: string): void => {
    if (typeof token === 'string') {
      localStorage.setItem('tokenBodega', token)

      void getProfile({ token })
        .then(res => {
          setUser(res)
          navigate('/home')
        })
        .catch(err => {
          console.error(err)
          localStorage.removeItem('tokenBodega')
          navigate('/')
        })
    }
  }

  const logout = (): void => {
    setUser(InitialUser)
    localStorage.removeItem('tokenBodega')
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): InterfaceAuthContext => {
  const context = useContext(AuthContext)
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
