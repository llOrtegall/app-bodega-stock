import { type newItem, type ItemsArray } from '../types/Item'
import axios, { type AxiosResponse } from 'axios'

interface createItemResponse {
  message: string
  error: string
}

export const getAllItems = async (company: string): Promise<ItemsArray> => {
  const response: AxiosResponse<ItemsArray> = await axios.get(`/itemsConBodegas/${company}`)
  return response.data
}

export const createItem = async (item: newItem): Promise<createItemResponse> => {
  const response: AxiosResponse<createItemResponse> = await axios.post('/createItem', item)
  return response.data
}
