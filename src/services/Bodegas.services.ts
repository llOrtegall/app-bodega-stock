import axios from 'axios'
import { type BodegaIntIS } from '../interfaces/Bodega'

export async function getAllBodegas (company: string): Promise<BodegaIntIS> {
  const response = await axios.get(`/getBodegas/${company}`)
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
