import axios from "axios"

export async function simcardsBodegas (company: string) {
  try {
    const simcardsResponse = await axios.get(`/simcardWhitBodega/${company}`)
    return simcardsResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function BodegaDataSims (company: string) {
  try {
    const bodegaResponse = await axios.get(`/getBodegasSim/${company}`)
    return bodegaResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
