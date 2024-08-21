import { useState } from 'react'
import { getLogin } from '../services/Login.services'
import { useAuth } from '../Auth/AuthContext'

interface UseLoginReturn {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  message: string
  loading: boolean
  error: string
  handleSubmit: (ev: React.FormEvent) => void
}

export function useLogin (): UseLoginReturn {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { login } = useAuth()

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()
    setLoading(true)
    setMessage('Iniciando sesión ...')

    void getLogin({ user: username, password })
      .then(response => {
        if (response.auth) {
          login(response.token)
        }
      })
      .catch(err => {
        setMessage('')
        if (err.message === 'Network Error') {
          setError('No se pudo conectar al servidor, consulte al administrador del sistema.')
          return
        }

        const errorString = err.response.data.message
        if (typeof errorString === 'string') {
          setError(errorString)
        }
      })
      .finally(() => {
        setLoading(false)
        setMessage('')
      })
  }

  return { username, setUsername, password, setPassword, message, loading, error, handleSubmit }
}
