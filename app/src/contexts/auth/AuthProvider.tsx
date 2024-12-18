import { createContext, useContext, useState, ReactNode, SetStateAction, Dispatch, useEffect } from 'react'
import { VITE_LOGIN_URL, VITE_APP_NAME } from '@/config/enviroments'
import { User } from '@/types/interfaces'
import axios from 'axios'

interface IAuthContext {
  isAuthenticated: boolean
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>
  company: string
  setCompany: Dispatch<SetStateAction<string>>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [company, setCompany] = useState<string>('Multired')

  useEffect(() => {
    if (!isAuthenticated) {
      axios.get(`${VITE_LOGIN_URL}/profile`, { params: { app: VITE_APP_NAME } })
        .then((res) => {
          if (res.status === 200) {
            setUser(res.data)
            setIsAuthenticated(true)
          }
        })
        .catch((err) => {
          console.error(err);
          if (err.response.status === 401) {
            setIsAuthenticated(false)
            setUser(null)
          }
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser, company, setCompany }}>
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