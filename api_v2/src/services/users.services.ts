import { pool_login } from '../connections/loginConnection'
import { hashPassword } from '../utils/passwordUtils'
import { type ResultSetHeader,  } from 'mysql2'
import { UserNew } from '../types/user'

export async function RegisterService(data: UserNew) {
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data
  const INSERT_USER_QUERY = 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'

  const USUARIO = `CP${documento}`
  const PASSWORD = `CP${documento.toString().slice(-3)}`

  const passwordHash = await hashPassword(PASSWORD)

  try {
    const inser_new = await pool_login.execute<ResultSetHeader>(
      INSERT_USER_QUERY,
      [nombres, apellidos, documento, telefono, correo, USUARIO, passwordHash, 1, empresa, proceso, rol]
    )
    return inser_new
  } catch (error) {
    throw error
  }
}

// export async function UsersService() {
//   return SelectQuery<IRowUser>({
//     pool: pool_login,
//     queryStr: 'SELECT * FROM usuarios',
//     values: []
//   })
// }

// export async function LoginService(data: UserLogin) {
//   const { username, password } = data

//   const [user] = await SelectQuery<IRowUser>({
//     pool: pool_login,
//     queryStr: 'SELECT * FROM usuarios WHERE usuario = ?',
//     values: [username]
//   })

//   if (!user) throw new UserNotFoundError()
//   if (user.estado === 0) throw new UserInactiveError()
//   const isValid = await comparePasswords(password, user.pass_1 as string)
//   if (!isValid) throw new IncorrectPasswordError()

//   const { _id, apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = user

//   return {
//     _id, apellidos, correo, nombres, telefono, rol, documento,
//     empresa: empresa !== undefined ? Empresa[empresa] : undefined,
//     proceso: proceso !== undefined ? Proceso[proceso] : undefined,
//     estado: user.estado !== undefined ? Estado[user.estado] : undefined,
//   }
// }