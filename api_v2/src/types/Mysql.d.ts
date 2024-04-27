type Params = string | number | Date | undefined;

export interface InsertProps {
  pool: Pool
  queryStr: string
  values: Params[]
}

export interface MySQLError {
  message: string
  code?: string
  sqlMessage?: string
}
