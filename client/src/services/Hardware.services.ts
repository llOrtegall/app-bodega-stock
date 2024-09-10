import axios, { type AxiosResponse } from 'axios'
import { type ArrayHardware } from '../types/hardware'
import { API_URL } from '../utils/constans'

export const getHardware = async (company: string): Promise<ArrayHardware> => {
  const response: AxiosResponse<ArrayHardware> = await axios.get(`${API_URL}/info/${company}`)
  return response.data
}
