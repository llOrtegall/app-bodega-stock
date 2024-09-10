import { type createBodega, type BodegaIntIS, type Bodegas } from '../types/Bodega'
import axios, { type AxiosResponse } from 'axios'
import { API_URL } from '../utils/constans'

export async function getAllBodegas (company: string): Promise<Bodegas> {
  const response = await axios.get(`${API_URL}/getBodegas/${company}`)
  const data = response.data as Bodegas
  return data
}

export async function getBodegasItemsSimsIds (company: string): Promise<Bodegas> {
  const response = await axios.get(`${API_URL}/getBodegasItemsSimcardIds/${company}`)
  const data = response.data
  return data
}

export async function getDetailBodegaById ({ company, id }: { company: string, id: string }): Promise<BodegaIntIS> {
  const response = await axios.get(`${API_URL}/getBodegasItemsSims/${company}/${id}`)
  const data = response.data as BodegaIntIS
  return data
}

export const postBodega = async (itemToSend: createBodega): Promise<AxiosResponse> => {
  const response = await axios.post(`${API_URL}/createBodega`, itemToSend)
  return response
}
