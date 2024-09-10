import { type newItem, type ItemsArray, type updateItem } from '../types/Item'
import { API_URL } from '../utils/constans'
import axios, { type AxiosResponse } from 'axios'

interface createItemResponse {
  message: string
  error: string
}

export const getItem = async (company: string, id: string): Promise<updateItem> => {
  const response: AxiosResponse<any> = await axios.get(`${API_URL}/getItem/${company}/${id}`)
  return response.data
}

export const getAllItems = async (company: string): Promise<ItemsArray> => {
  const response: AxiosResponse<ItemsArray> = await axios.get(`${API_URL}/itemsConBodegas/${company}`)
  return response.data
}

export const createItem = async (item: newItem): Promise<createItemResponse> => {
  const response: AxiosResponse<createItemResponse> = await axios.post(`${API_URL}/createItem`, item)
  return response.data
}

export const addItemsToBodega = async (sucursal: string, itemIds: string[], company: string): Promise<createItemResponse> => {
  const response: AxiosResponse<createItemResponse> = await axios.post(`${API_URL}/addItemsToBodega`, { sucursal, itemIds, company })
  return response.data
}

export const sendUpdateItem = async (item: updateItem): Promise<createItemResponse> => {
  const response: AxiosResponse<createItemResponse> = await axios.patch(`${API_URL}/updateItem`, item)
  return response.data
}
