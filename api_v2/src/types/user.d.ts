import { Empresa, Estado, Proceso } from './enums'

export interface UserNew {
  nombres: string
  apellidos: string
  documento: number
  telefono: number
  correo: string
  empresa: Empresa
  proceso: Proceso
  rol?: string | undefined
}

export interface UserCreated {
  _id: string
  nombres: string
  apellidos: string
  documento: number
  telefono: number
  correo: string
  username: string
  password: string
  password2?: string
  estado: Estado
  empresa: Empresa
  proceso: Proceso
  rol?: string
  fecha_creacion?: Date
  resetPasswordToken?: string
  resetPasswordExpires?: Date
}

export interface UserLogin {
  usuario: string
  password: string
}