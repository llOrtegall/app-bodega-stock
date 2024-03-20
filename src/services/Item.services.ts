import { type ItemsArray } from '../types/Item'
import axios, { type AxiosResponse } from 'axios'

export const getAllItems = async (company: string): Promise<ItemsArray> => {
  const response: AxiosResponse<ItemsArray> = await axios.get(`/itemsConBodegas/${company}`)
  return response.data
}
