import { type ItemsArray } from '../types/Item'
import axios from 'axios'

export const getAllItems = async (company: string): Promise<ItemsArray> => {
  const response = await axios.get(`/itemsConBodegas/${company}`)
  const data = response.data as ItemsArray
  return data
}
