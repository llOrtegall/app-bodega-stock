import axios from 'axios'
import { type Bodegas } from '../types/Bodega'

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

export const postBodega = async (itemToSend: object): Promise<[]> => {
  try {
    const res = await axios.post('/createBodega', itemToSend)
    return { data: res.data, error: null }
  } catch (err: string | any) {
    return { data: null, error: err.response.data.error }
  }
}
