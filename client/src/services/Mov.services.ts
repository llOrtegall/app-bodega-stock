import axios from 'axios'
import { API_URL } from '../utils/constans'

export const getMovimientos = async (company: string): Promise<any> => {
  try {
    const MoviResponse = await axios.get(`${API_URL}/getMovimientos/${company}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getMovimiento = async (company: string, id: string): Promise<any> => {
  try {
    const MoviResponse = await axios.get(`${API_URL}/movimiento/${company}/${id}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
