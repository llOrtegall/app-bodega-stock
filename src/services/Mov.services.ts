import axios from 'axios'

export const getMovimientos = async (company: string): Promise<any> => {
  try {
    const MoviResponse = await axios.get(`/getMovimientos/${company}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}

export const getMovimiento = async (company: string, id: string): Promise<any> => {
  try {
    const MoviResponse = await axios.get(`/movimiento/${company}/${id}`)
    return MoviResponse.data
  } catch (error) {
    console.log(error)
    return error
  }
}
