import { generatePassword, generateUsername } from '../utils/funtionsReutilizables.js'
import { Company, Proceso, State } from '../utils/Definiciones.js'
import { getPoolLogin } from '../connections/mysqlLoginDB.js'

import bcrypt from 'bcryptjs'

const BCRYPT_SALT_ROUNDS = 10

export const getUsersService = async () => {
  const pool = await getPoolLogin()
  const [response] = await pool.query('SELECT *, BIN_TO_UUID(id) FROM login')
  response.forEach((element) => {
    element.estado = State({ estado: element.estado })
    element.empresa = Company({ empresa: element.empresa })
    element.proceso = Proceso({ proceso: element.proceso })
    delete element.id
  })
  return response
}

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

export const registerUserService = async ({ data }) => {
  const pool = await getPoolLogin()
  const { nombres, apellidos, documento, telefono, correo, empresa, proceso, rol } = data.data
  const [existingUser] = await pool.query('SELECT documento FROM login WHERE documento = ?', [documento])
  if (existingUser.length > 0) {
    throw new Error(`El usuario con el documento N° ${documento} ya existe.`)
  }
  const password = generatePassword(documento)
  const username = generateUsername(documento)
  const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
  const [createdUser] = await pool.query(
    `INSERT INTO login (nombres, apellidos, documento, telefono, correo, username, password, estado, empresa, proceso, rol) 
     VALUES (?, ?, ?, ?, ?, ?, ?, TRUE, ?, ?, ?);`,
    [nombres, apellidos, documento, telefono, correo, username, passwordHash, empresa, proceso, rol]
  )
  if (createdUser.affectedRows === 0) {
    throw new Error('Hubo un problema al crear el usuario. Por favor, inténtalo de nuevo.')
  }
  return { message: 'Usuario creado correctamente.' }
}
