import { pool_login } from '../connections/loginConnection'
import { hashPassword } from '../utils/passwordUtils'
import { UserNew } from '../types/user'
import { type ResultSetHeader, } from 'mysql2'

export async function RegisterService(data: UserNew) {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data
  const INSERT_USER_QUERY = 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

  const USUARIO = `CP${documento}`
  const PASSWORD = `CP${documento.toString().slice(-3)}`

  const passwordHash = await hashPassword(PASSWORD)

  try {
    const inser_new = await pool_login.execute<ResultSetHeader>
      (
        INSERT_USER_QUERY,
        [nombres, apellidos, documento, telefono, correo, USUARIO, passwordHash, 1, empresa, proceso, rol]
      )
    return inser_new
  } catch (error) {
    throw error
  }
}