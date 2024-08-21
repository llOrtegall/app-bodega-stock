import { useState } from 'react'
import axios from 'axios'

interface UseLoginReturn {
  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  password: string
  setPassword: React.Dispatch<React.SetStateAction<string>>
  handleSubmit: (ev: React.FormEvent) => void
}

export function useLogin (): UseLoginReturn {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()

    axios.post('http://localhost:4040/api/v1/login', { username, password, app: 'bodega-stock' })
      .then(response => console.log(response.data))
      .catch(err => console.log(err))
      .finally(() => console.log('finally'))
  }

  return { username, setUsername, password, setPassword, handleSubmit }
}
