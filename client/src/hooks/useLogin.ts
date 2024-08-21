import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { UserLogin } from '../types/Interfaces'
import { useAuth } from '../Auth/AuthContext'

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

  const { setUser } = useAuth()

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()

    axios.post('http://localhost:4040/api/v1/login', { username, password, app: 'bodega-stock' })
      .then((response: AxiosResponse<UserLogin>) => {
        if (response.status === 200) {
          setUser(response.data.usuario)
        }
      })




      .catch(err => console.log(err))
      .finally(() => console.log('finally'))
  }

  return { username, setUsername, password, setPassword, handleSubmit }
}
