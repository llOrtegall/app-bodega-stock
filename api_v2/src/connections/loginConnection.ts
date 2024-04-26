import { createPool } from 'mysql2/promise'
import 'dotenv/config'

export const pool_login = createPool({
  host: process.env.LOGIN_HOST as string,
  port: parseInt(process.env.LOGIN_PORT as string),
  user: process.env.LOGIN_USER as string,
  password: process.env.LOGIN_PASS as string,
  database: process.env.LOGIN_DB as string,
})