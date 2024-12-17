import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch } from 'react'

interface User {
  id: string
  name: string
}

interface IAuthContext {
  isAuthenticated: boolean
  user: User
  setUser: Dispatch<SetStateAction<User>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({ id: '', name: '' })
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}