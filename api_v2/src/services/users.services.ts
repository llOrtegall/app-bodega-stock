import { pool_login } from '../connections/loginConnection'
import { InsertQuery } from '../databases/querys'
import { UserNew } from '../types/user'

export async function RegisterServices(data: UserNew): Promise<any> {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data

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