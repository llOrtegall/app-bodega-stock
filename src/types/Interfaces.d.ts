export interface User {
  id: string
  nombres: string
  apellidos: string
  correo: string
  username: string
  empresa: string
  proceso: string
  rol: string
  iat: number
  exp: number
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
