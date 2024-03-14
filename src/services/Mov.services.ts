import axios from "axios"

export const getMovimientos = async (company: string) => {
  try {
    const MoviResponse = await axios.get(`/getMovimientos/${company}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}