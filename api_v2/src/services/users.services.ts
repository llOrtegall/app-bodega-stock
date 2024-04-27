import { pool_login } from '../connections/loginConnection'
import { hashPassword } from '../utils/passwordUtils'
import { InsertQuery } from '../databases/querys'
import { type ResultSetHeader } from 'mysql2'
import { type UserNew } from '../types/user'



export async function RegisterServices(data: UserNew): Promise<ResultSetHeader> {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data

  // TODO: Separo el query en dos partes para facilitar la lectura ademas de agregar un prefijo al usuario
  const SQL = 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol)'
  const VALUES = 'VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  const USUARIO = `CP${documento}`
  const PASSWORD = `CP${documento.toString().slice(-3)}`
  
  const passwordHash = await hashPassword(PASSWORD)

  return InsertQuery(
    {
      pool: pool_login,
      queryStr: `${SQL} ${VALUES}`,
      values: [nombres, apellidos, documento, telefono, correo, USUARIO, passwordHash, 1, empresa, proceso, rol]
    }
  )

}