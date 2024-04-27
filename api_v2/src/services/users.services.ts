import { pool_login } from '../connections/loginConnection'
import { InsertQuery } from '../databases/querys'
import { type ResultSetHeader } from 'mysql2'
import { UserNew } from '../types/user'

export async function RegisterServices(data: UserNew): Promise<ResultSetHeader> {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data

  // TODO: Separo el query en dos partes para facilitar la lectura ademas de agregar un prefijo al usuario y contraseña encriptada
  const SQL = 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol)'
  const VALUES = 'VALUES (?,?,?,?,?,?,?,?,?,?,?)'
  const USUARIO = `CP${documento}`

  return InsertQuery(
      {
        pool: pool_login,
        queryStr: `${SQL} ${VALUES}`,
        values: [nombres, apellidos, documento, telefono, correo, USUARIO, USUARIO, 1, empresa, proceso, rol]
      }
    )
    .then(result => { return result })
    .catch(error => { throw error })
}