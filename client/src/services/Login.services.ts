import axios, { type AxiosResponse } from 'axios'
import { type User } from '../types/Interfaces'

export const getLogin = async ({ user, password }: { user: string, password: string }) => {
  try {
    const response: AxiosResponse = await axios.post('/login', { user, password })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getProfile = async ({ token }: { token: string }): Promise<User> => {
  try {
    const response: AxiosResponse<User> = await axios.get('/profile', { headers: { Authorization: `Bearer ${token}` } })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
