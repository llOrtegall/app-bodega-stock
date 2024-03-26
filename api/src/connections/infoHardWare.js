import { createPool } from "mysql2/promise";

export function connect() {
  return createPool({
    host: process.env.OCS_HOST,
    user: process.env.OCS_USER,
    password: process.env.OCS_PASS,
    database: process.env.OCS_DB,
    port: 3306
  })
}