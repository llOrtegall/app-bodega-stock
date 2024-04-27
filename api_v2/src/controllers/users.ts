import { LoginService, RegisterService, UsersService } from '../services/users.services'
import { validateUser, validateLogin } from '../schemas/user.schema'
import { Request, Response } from 'express'
import { MySQLError } from '../types/Mysql'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const validUser = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!validUser.success) {
    return res.status(400).json(validUser.error)
  }

  // TODO: llama al servicio de registro de usuarios y responde con el resultado de type ResultSetHeader (mysql2)
  try {
    const result = await RegisterService(validUser.data)
    if (result.affectedRows > 0) {
      return res.status(201).json({ message: 'Usuario creado correctamente' })
    }
  } catch (error) {
    const err = error as MySQLError
    console.error(err) // Log all errors
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'El usuario ya se encuentra registrado' })
    }
    if (err.code === 'ECONNREFUSED') {
      return res.status(500).json({ message: 'Error de conexión con la base de datos' })
    }
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UsersService()
    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

export const loginUser = async (req: Request, res: Response) => {
  const validLogin = validateLogin(req.body)

  if (!validLogin.success) {
    return res.status(400).json(validLogin.error)
  }

  try {
    const result = await LoginService(validLogin.data)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error })
  }
  
}