import { validateLogin, validateUser } from '../schemas/user.schema'
import { RegisterService } from '../services/users.services'
import { Empresa, Proceso } from '../types/enums'
import { comparePasswords } from '../utils/passwordUtils'
import { IRowUser, MySQLError } from '../types/Mysql'
import { SelectQuery } from '../databases/querys'
import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const validUser = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!validUser.success) {
    return res.status(400).json(validUser.error)
  }

  // TODO: intenta crear el usuario con los datos recibidos
  try {
    const result = await RegisterService(validUser.data)
    if (result[0].affectedRows === 1) {
      return res.status(201).json({ message: 'Usuario creado correctamente' })
    } else {
      return res.status(500).json({ message: 'Error interno del servidor' })
    }
  } catch (error) {
    const err = error as MySQLError
    console.log(err.sqlMessage)
    if(err.errno === 1062 || err.code === 'ER_DUP_ENTRY'){
      return res.status(400).json({ message: `${err.sqlMessage}` })
    }
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await SelectQuery<IRowUser>('SELECT * FROM usuarios')
    return res.status(200).json(users)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const validLogin = validateLogin(req.body)

  if (!validLogin.success) {
    return res.status(400).json(validLogin.error)
  }

  try {
    const [result] = await SelectQuery<IRowUser>('SELECT * FROM usuarios WHERE usuario = ?', [validLogin.data.username])
    if(!result) return res.status(404).json({ message: 'Usuario no encontrado y/o no Existe' })
    const isValid = await comparePasswords(validLogin.data.password, result.pass_1 as string)
    if (!isValid) return res.status(401).json({ message: 'Contraseña incorrecta' })
    if(result.estado === 0) return res.status(401).json({ message: 'Usuario inactivo' })
    
    const { _id, apellidos, documento, correo, empresa, nombres, proceso, telefono } = result
    const empresa_name = Empresa[empresa as unknown as keyof typeof Empresa]
    const proceso_name = Proceso[proceso as unknown as keyof typeof Proceso]
    
    return res.status(200).json({ _id, nombres, apellidos, documento, correo, empresa_name, proceso_name, telefono })
  } catch (error) {
    console.log(error);
  }
  
}
