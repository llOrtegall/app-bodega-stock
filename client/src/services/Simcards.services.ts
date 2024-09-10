import { type SimcardWithBodega } from '../types/Simcard.interfaces'
import axios, { type AxiosResponse } from 'axios'
import { type Bodegas } from '../types/Bodega'
import { API_URL } from '../utils/constans'

export async function simcardsBodegas (company: string): Promise<SimcardWithBodega[]> {
  const simcardsResponse: AxiosResponse<SimcardWithBodega[]> = await axios.get(`${API_URL}/simcardWhitBodega/${company}`)
  return simcardsResponse.data
}

export async function BodegaDataSims (company: string): Promise<Bodegas> {
  const bodegaResponse: AxiosResponse<Bodegas> = await axios.get(`${API_URL}/getBodegasSim/${company}`)
  return bodegaResponse.data
}

export async function addSimcardsToBodega (sucursal: string, simcardIds: string[], company: string): Promise<AxiosResponse<{ message: string }>> {
  return await axios.post('${API_URL}/addSimcardToBodega', { sucursal, simcardIds, company })
}
