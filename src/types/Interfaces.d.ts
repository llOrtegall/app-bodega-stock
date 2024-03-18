export interface User {
  apellidos: string
  correo: string
  empresa: string
  id: string
  nombres: string
  proceso: string
  rol: string
  username: string
}

export interface AuthProviderProps {
  children: React.ReactNode
}

export interface ProtectedRouteProps {
  redirectTo?: string
  isAllowed?: boolean
}

export interface UseLoginReturn {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  message: string
  loading: boolean
  error: string
  handleSubmit: (ev: React.FormEvent) => void
}
