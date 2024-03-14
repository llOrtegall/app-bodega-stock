import axios from "axios"
import { BodegaIntIS } from '../interfaces/Bodega.Interfaces'

export async function getAllBodegas (company: string) {
  const response = await axios.get(`/getBodegas/${company}`)
  const data = response.data as BodegaIntIS[]
  return data
}

export const postBodega= async (itemToSend: object) => {
  try {
    const res = await axios.post('/createBodega', itemToSend)
    return { data: res.data, error: null }
  } catch (err: string | any) {
    return { data: null, error: err.response.data.error }
  }
}