import axios from 'axios'

export async function simcardsBodegas (company: string): Promise<any> {
  const simcardsResponse = await axios.get(`/simcardWhitBodega/${company}`)
  return simcardsResponse.data
}

export async function BodegaDataSims (company: string): Promise<any> {
  const bodegaResponse = await axios.get(`/getBodegasSim/${company}`)
  return bodegaResponse.data
}
