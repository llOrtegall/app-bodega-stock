import { type Pool, type RowDataPacket } from "mysql2/promise";
import { Empresa, Estado, Proceso } from './enums'
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
  _id: number
  nombres: string
  apellidos: string
  documento: string
  telefono: string
  correo: string
  usuario: string
  pass_1: string
  estado: Estado
  empresa: Empresa
  proceso: Proceso
  rol?: string
}