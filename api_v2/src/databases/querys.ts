import { SQL_Props, MySQLError } from '../types/Mysql'
import { type ResultSetHeader } from 'mysql2'

// TODO: Función que ejecuta una consulta a la base de datos y retorna un ResultSetHeader
export async function InsertQuery({ pool, queryStr, values }: SQL_Props): Promise<ResultSetHeader> {
  try {
    const [results] = await pool.execute(queryStr, values)
    return results as ResultSetHeader
  } catch (error) {
    const err = error as MySQLError
    throw { message: err.message, code: err.code, sqlMessage: err.sqlMessage }
  }
}

export async function SelectQuery<T>({ pool, queryStr, values }: SQL_Props): Promise<Partial<T>[]> {
  try {
    const [results] = await pool.execute(queryStr, values)
    return results as T[]
  } catch (error) {
    throw error
  }
}