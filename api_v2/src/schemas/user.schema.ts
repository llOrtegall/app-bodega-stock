import { UserNew, UserLogin } from '../types/user'
import z from 'zod'

const UserSchema = z.object({
  nombres: z.string({
    invalid_type_error: 'El nombre debe ser un texto',
    required_error: 'El nombre es requerido'
  }),
  apellidos: z.string({
    invalid_type_error: 'El apellido debe ser un texto',
    required_error: 'El apellido es requerido'
  }),
  documento: z.number({
    invalid_type_error: 'El documento debe ser un número',
    required_error: 'El documento es requerido'
  }),
  telefono: z.number({
    invalid_type_error: 'El telefono debe ser un número',
    required_error: 'El telefono es requerido'
  }),
  correo: z.string({
    invalid_type_error: 'El correo debe ser un texto',
    required_error: 'El correo es requerido'
  }).email({
    message: 'El correo no es valido'
  }),
  empresa: z.number({
    invalid_type_error: 'La empresa debe ser un número',
    required_error: 'La empresa es requerida'
  }).int().min(0).max(2),
  proceso: z.number({
    invalid_type_error: 'El proceso debe ser un número', required_error: 'El proceso es requerido'
  }).int().min(0).max(9),
  rol: z.string({
    invalid_type_error: 'El rol debe ser un texto',
    required_error: 'El rol es requerido'
  }).optional()
})

const LoginSchema = z.object({
  usuario: z.string({
    invalid_type_error: 'El usuario debe ser un texto',
    required_error: 'El usuario es requerido'
  }).refine(value => /^CP\d{5,15}$/.test(value), {
    message: 'El usuario debe comenzar con "CP" seguido del número de documento',
  }),
  password: z.string({
    invalid_type_error: 'El password debe ser un texto',
    required_error: 'El password es requerido'
  })
})

export function validateLogin(login: UserLogin){
  return LoginSchema.safeParse(login)
}

export function validateUser(user: UserNew){
  return UserSchema.safeParse(user)
}