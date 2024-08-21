import { createContext, useContext, useState } from 'react'
import { type User } from '../types/Interfaces'

interface InterfaceAuthContext {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

interface AuthProviderProps {
  children: React.ReactNode
}

const InitialUser: User = { apellidos: '', correo: '', empresa: '', id: '', nombres: '', proceso: '', rol: '', username: '', exp: 0, iat: 0 }

const AuthContext = createContext<InterfaceAuthContext>(
  {
    user: InitialUser,
    setUser: () => {}
  })

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>(InitialUser)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
