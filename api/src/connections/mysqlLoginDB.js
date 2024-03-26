import { createPool } from 'mysql2/promise'

export const getPoolLogin = async () => {
  let pool
  try {
    pool = createPool({
      host: process.env.LOGIN_HOST,
      user: process.env.LOGIN_USER,
      port: process.env.LOGIN_PORT,
      password: process.env.LOGIN_PASS,
      database: process.env.LOGIN_DB
    })
  } catch (error) {
    console.error('Error creating MySQL pool', error)
    throw new Error('Error al conectar con la base de datos')
  }
  return pool
}
