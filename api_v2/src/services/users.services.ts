import { IncorrectPasswordError, UserInactiveError, UserNotFoundError } from '../utils/errors'
import { hashPassword, comparePasswords } from '../utils/passwordUtils'
import { InsertQuery, SelectQuery } from '../databases/querys'
import { pool_login } from '../connections/loginConnection'
import { Empresa, Proceso, Estado } from '../types/enums'
import { UserLogin, UserNew } from '../types/user'
import { type ResultSetHeader } from 'mysql2'
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

export async function LoginService(data: UserLogin) {
  const { username, password } = data

  const [user] = await SelectQuery<IRowUser>({
    pool: pool_login,
    queryStr: 'SELECT * FROM usuarios WHERE usuario = ?',
    values: [username]
  })

  if (!user) throw new UserNotFoundError()
  if (user.estado === 0) throw new UserInactiveError()
  const isValid = await comparePasswords(password, user.pass_1 as string)
  if (!isValid) throw new IncorrectPasswordError()

  const { _id, apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = user

  return {
    _id, apellidos, correo, nombres, telefono, rol, documento,
    empresa: empresa !== undefined ? Empresa[empresa] : undefined,
    proceso: proceso !== undefined ? Proceso[proceso] : undefined,
    estado: user.estado !== undefined ? Estado[user.estado] : undefined,
  }
}