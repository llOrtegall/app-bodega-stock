import { pool_login } from '../connections/loginConnection'
import { InserQuery } from '../databases/querys'
import { UserNew } from '../types/user'

export async function RegisterServices(data: UserNew){
  console.log(data);
  const { apellidos, correo, documento, empresa, nombres, proceso, telefono, rol } = data

  const SQL = 'INSERT INTO usuarios (nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol, fecha_creacion)'
  const VALUES = 'VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'

  const result = await InserQuery
    (
      pool_login, 
      `${SQL} ${VALUES}`, 
      [nombres, apellidos, documento, telefono, correo, 'juanperez', 'password123', 1, empresa, proceso, rol,'CURRENT_TIMESTAMP']
    )
  console.log(result);
  
  // INSERT INTO usuarios (
  //  nombres, apellidos, documento, telefono, correo, usuario, pass_1, estado, empresa, proceso, rol, fecha_creacion
  // ) VALUES (
  //  'Juan', 'Perez', 12345678, 9876543210, 'juan.perez@example.com', 'juanperez', 'password123', 1, 0, 1, 'admin', NOW() );


}


// import { generatePassword, generateUsername } from '../utils/funtionsReutilizables.js'
// import { Company, Proceso, State } from '../utils/Definiciones.js'
// import { pool_login } from '../connections/loginConnection'
// import { SelectQuery } from '../databases/querys'
// import { Empresa, Proceso, User } from '../types/user'

// import bcrypt from 'bcryptjs'
/*
const BCRYPT_SALT_ROUNDS = 10
const PROPERTIES_SELECT = '_id, nombres, apellidos, documento, telefono, correo, username, estado, empresa, proceso, rol, fecha_creacion, resetPasswordToken, resetPasswordExpires'

export const getUsersService = async () => {
  const users: User[] = await SelectQuery(pool_login, `SELECT *, BIN_TO_UUID(id) as _id FROM login`, [])  
 
  
  return users
}
*/

/* 

export const LoginService = async (data) => {
  const { user, password } = data

  if (!user || !password) {
    throw new Error('El Usuario / Contraseña Son Requeridos')
  }
  const pool = await getPoolLogin()
  const [result] = await pool.query('SELECT *, BIN_TO_UUID(id) FROM login WHERE username = ?', [user])
  if (result.length === 0) {
    throw new Error(`El Usuario ${user} No Se Encuentra Registrado`)
  }
  const passwordMatches = await bcrypt.compare(password, result[0].password)
  if (!passwordMatches) {
    throw new Error('Contraseña Incorrecta !!!')
  }
  if (result[0].estado === 0) {
    throw new Error('Usuario Se Ecuentra Inactivo')
  }
  delete result[0].id; delete result[0].password; delete result[0].password2; delete result[0].estado; delete result[0].resetPasswordToken; delete result[0].resetPasswordExpires; delete result[0].documento; delete result[0].telefono; delete result[0].fecha_creacion

  const { 'BIN_TO_UUID(id)': id, ...rest } = result[0]
  result[0] = { id, ...rest }

  result.forEach((element) => {
    element.empresa = Company({ empresa: element.empresa })
    element.proceso = Proceso({ proceso: element.proceso })
  })

  return result[0]
}


*/
