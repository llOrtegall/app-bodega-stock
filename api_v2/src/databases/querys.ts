import { ResultSetHeader } from 'mysql2'
import { Pool } from 'mysql2/promise' 

export async function SelectQuery(pool: Pool, queryStr: string, params: (string | number | Date)[]): Promise<any>{
  try {
    const [results] = await pool.execute(queryStr, params)
    return results
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