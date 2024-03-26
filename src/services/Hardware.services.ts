import axios, { type AxiosResponse } from 'axios'
import { type ArrayHardware } from '../types/hardware'

export const getHardware = async (company: string): Promise<ArrayHardware> => {
  const response: AxiosResponse<ArrayHardware> = await axios.get(`/info/${company}`)
  return response.data
}
