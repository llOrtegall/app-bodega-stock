import { type SimcardWithBodega } from '../types/Simcard.interfaces'
import axios, { type AxiosResponse } from 'axios'
import { type Bodegas } from '../types/Bodega'

export async function simcardsBodegas (company: string): Promise<SimcardWithBodega[]> {
  const simcardsResponse: AxiosResponse<SimcardWithBodega[]> = await axios.get(`/simcardWhitBodega/${company}`)
  return simcardsResponse.data
}

export async function BodegaDataSims (company: string): Promise<Bodegas> {
  const bodegaResponse: AxiosResponse<Bodegas> = await axios.get(`/getBodegasSim/${company}`)
  return bodegaResponse.data
}

export async function addSimcardsToBodega (sucursal: string, simcardIds: string[], company: string): Promise<AxiosResponse<{ message: string }>> {
  return await axios.post('/addSimcardToBodega', { sucursal, simcardIds, company })
}
