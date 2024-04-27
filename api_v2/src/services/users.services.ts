import { InsertQuery, SelectQuery } from '../databases/querys'
import { pool_login } from '../connections/loginConnection'
import { hashPassword } from '../utils/passwordUtils'
import { type ResultSetHeader } from 'mysql2'
import { type UserNew } from '../types/user'
import { IRowUser } from '../types/Mysql'

export async function RegisterService(data: UserNew): Promise<ResultSetHeader> {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data
  
  const USUARIO = `CP${documento}`
  const PASSWORD = `CP${documento.toString().slice(-3)}`

  const passwordHash = await hashPassword(PASSWORD)

  return InsertQuery({
    pool: pool_login,
    queryStr: 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
    values: [nombres, apellidos, documento, telefono, correo, USUARIO, passwordHash, 1, empresa, proceso, rol]
  })
}

export async function UsersService() {
  return SelectQuery<IRowUser>({
    pool: pool_login,
    queryStr: 'SELECT * FROM usuarios',
    values: []
  })
}