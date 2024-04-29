import { pool_login } from "../connections/loginConnection";
import { ResultSetHeader } from 'mysql2/promise'

export async function SelectQuery<T>(query: string, values?: any[]): Promise<Partial<T>[]>{
  const [results] = await pool_login.execute(query, values);
  return results as T[];
}

export async function ModifyQuery(query: string, values: any[]): Promise<ResultSetHeader>{
  const [results] = await pool_login.execute(query, values);
  return results as ResultSetHeader;
}