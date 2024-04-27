import { ResultSetHeader } from 'mysql2'
import { Pool } from 'mysql2/promise'

type Params = string | number | Date | undefined;

interface Props {
  pool: Pool
  queryStr: string
  values: Params[]
}

export async function InsertQuery({ pool, queryStr, values }: Props): Promise<ResultSetHeader>{
  try {
    const [results] = await pool.execute(queryStr, values)
    return results as ResultSetHeader
  } catch (error) {
    throw error;
  }
}