import { type ItemWithBodega } from '../interfaces/Item.Intece'
import axios from 'axios'

export const getAllItems = async (company: string): Promise<ItemWithBodega> => {
  const response = await axios.get(`/itemsConBodegas/${company}`)
  const data = response.data
  return data
}
