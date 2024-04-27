import { ResultSetHeader } from 'mysql2'
import { Pool } from 'mysql2/promise' 

export async function InserQuery(pool: Pool, queryStr: string, params: (string | number | Date | undefined )[]): Promise<ResultSetHeader>{
  try {
    const [results] = await pool.execute(queryStr, params)
    return results as ResultSetHeader
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function ModifyQuery(pool: Pool, queryStr: string): Promise<ResultSetHeader>{
  try {
    const [results] = await pool.execute(queryStr)
    return results as ResultSetHeader
  } catch (error) {
    console.error(error);
    throw error;
  }
}