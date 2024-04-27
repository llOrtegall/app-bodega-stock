import { type Pool, type RowDataPacket } from "mysql2/promise";

type Params = string | number | Date | undefined;

export interface SQL_Props {
  pool: Pool
  queryStr: string
  values: Params[]
}

export interface MySQLError {
  message: string
  code?: string
  sqlMessage?: string
}


export interface IRowUser extends RowDataPacket {
  id: number
  nombres: string
  apellidos: string
  documento: string
  telefono: string
  correo: string
  usuario: string
  pass_1: string
  estado: number
  empresa: string
  proceso: string
  rol?: string
}