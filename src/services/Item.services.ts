import axios from 'axios'
import { ItemWithBodega } from '../interfaces/Item.Intece'

export const getAllItems = async (company: string) => {
  const response = await axios.get(`/itemsConBodegas/${company}`)
  const data = response.data as ItemWithBodega
  return data
}
