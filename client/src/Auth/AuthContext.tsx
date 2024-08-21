import { createContext, useContext, useState } from 'react'
import { type User } from '../types/Interfaces'

interface InterfaceAuthContext {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserInitialState: User = { id: '', names: '', lastnames: '', username: '', email: '', company: '', process: '', sub_process: '', app: 'bodega-stock' }

const AuthContext = createContext<InterfaceAuthContext | undefined>({
  user: UserInitialState,
  setUser: () => {}
})

export const AuthProvider = ({ children }:{ children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(UserInitialState)

  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
