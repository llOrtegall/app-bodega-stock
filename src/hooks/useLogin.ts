import { type UseLoginReturn } from '../interfaces/Interfaces'
import { useAuth } from '../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'

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

    axios.post('/login', { user: username, password })
      .then(response => {
        setLoading(false)
        setMessage('')
        const tokenString = response.data.token
        if (typeof tokenString === 'string') {
          login(tokenString)
          localStorage.setItem('tokenBodega', tokenString)
        } else {
          setError('No se pudo iniciar sesión, intente de nuevo.')
          setTimeout(() => {
            setError('')
          }, 3000)
        }
      })
      .catch(err => {
        setMessage('')
        setLoading(false)
        if (err.message === 'Network Error') {
          setError('No se pudo conectar al servidor, consulte al administrador del sistema.')
          setTimeout(() => {
            setError('')
          }, 6000)
          return
        }

        const errorString = err.response.data.message
        if (typeof errorString === 'string') {
          setError(errorString)
        }

        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return { username, setUsername, password, setPassword, message, loading, error, handleSubmit }
}
