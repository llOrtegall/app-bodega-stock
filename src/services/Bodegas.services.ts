import axios, { type AxiosResponse } from 'axios'
import { type createBodega, type BodegaIntIS, type Bodegas } from '../types/Bodega'

export async function getAllBodegas (company: string): Promise<Bodegas> {
  const response = await axios.get(`/getBodegas/${company}`)
  const data = response.data as Bodegas
  return data
}

export async function getBodegasItemsSimsIds (company: string): Promise<Bodegas> {
  const response = await axios.get(`/getBodegasItemsSimcardIds/${company}`)
  const data = response.data
  return data
}

export async function getDetailBodegaById ({ company, id }: { company: string, id: string }): Promise<BodegaIntIS> {
  const response = await axios.get(`/getBodegasItemsSims/${company}/${id}`)
  const data = response.data as BodegaIntIS
  return data
}

export const postBodega = async (itemToSend: createBodega): Promise<AxiosResponse> => {
  const response = await axios.post('/createBodega', itemToSend)
  return response
}
