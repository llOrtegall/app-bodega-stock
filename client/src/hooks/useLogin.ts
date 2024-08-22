import { LOGIN_URL, APP_NAME } from '../utils/constans'
import { useAuth } from '../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'

interface UseLoginReturn {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (ev: React.FormEvent) => void
}

export function useLogin(): UseLoginReturn {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setIsAuthenticated } = useAuth()

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()

    axios.post(`${LOGIN_URL}/login`, { username, password, app: APP_NAME })
      .then(res => {
        if( res.status === 200 ) {
          setIsAuthenticated(true)
        }
      })
      .catch(err => console.log(err))
  }

  return { username, setUsername, password, setPassword, handleSubmit }
}
