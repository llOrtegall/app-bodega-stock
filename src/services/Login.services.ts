import axios, { type AxiosResponse } from 'axios'

interface LoginResponse {
  auth: boolean
  token: string
}

export const getLogin = async ({ user, password }: { user: string, password: string }): Promise<LoginResponse> => {
  try {
    const response: AxiosResponse<LoginResponse> = await axios.post('/login', { user, password })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
