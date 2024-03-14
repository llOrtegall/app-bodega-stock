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