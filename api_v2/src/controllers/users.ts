import { RegisterService } from '../services/users.services'
import { validateUser } from '../schemas/user.schema'
import { Request, Response } from 'express'
import { MySQLError } from '../types/Mysql'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const validUser = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!validUser.success) {
    return res.status(400).json(validUser.error)
  }

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

/* 

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
    if (error instanceof UserNotFoundError || error instanceof UserInactiveError || error instanceof IncorrectPasswordError) {
      return res.status(401).json({ message: error.message })
    }
    return res.status(500).json({ message: error })
  }
  
}

*/