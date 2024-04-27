import { type ResultSetHeader } from 'mysql2'
import { type InsertProps, MySQLError } from '../types/Mysql'

// TODO: Función que ejecuta una consulta a la base de datos y retorna un ResultSetHeader
export async function InsertQuery({ pool, queryStr, values }: InsertProps): Promise<ResultSetHeader> {
  try {
    const [results] = await pool.execute(queryStr, values)
    return results as ResultSetHeader
  } catch (error) {
    const err = error as MySQLError
    throw { message: err.message, code: err.code, sqlMessage: err.sqlMessage }
  }
}