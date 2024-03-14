import axios from "axios"
import { BodegaIntIS } from '../interfaces/Bodega.Interfaces'

export async function getAllBodegas (company: string) {
  const response = await axios.get(`/getBodegas/${company}`)
  const data = response.data as BodegaIntIS[]
  return data
}