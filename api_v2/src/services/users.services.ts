import { hashPassword, comparePasswords } from '../utils/passwordUtils'
import { InsertQuery, SelectQuery } from '../databases/querys'
import { pool_login } from '../connections/loginConnection'
import { type ResultSetHeader } from 'mysql2'
import { UserLogin, type UserNew } from '../types/user'
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
  const { usuario, password } = data

  const [user] = await SelectQuery<IRowUser>({
    pool: pool_login,
    queryStr: 'SELECT * FROM usuarios WHERE usuario = ?',
    values: [usuario]
  })

  if (!user) {
    throw 'Usuario no encontrado'
  }

  if(user.estado === 0){
    throw 'Usuario Se Encuentra Inactivo'
  }
  
  const isValid = await comparePasswords(password, user.pass_1 as string)
  
  if(!isValid){
    throw 'Contraseña incorrecta'
  }

  const { nombres, apellidos, correo, documento, empresa, estado, _id, rol, telefono, proceso } = user

  return { nombres, apellidos, correo, documento, empresa, estado, _id, rol, telefono, proceso }
}