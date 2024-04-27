import { RegisterServices } from '../services/users.services'
import { validateUser } from '../schemas/user.schema'
import { Request, Response } from 'express'
import { MySQLError } from '../types/Mysql'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const result = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!result.success) {
    return res.status(400).json(result.error)
  }

  // TODO: llama al servicio de registro de usuarios y responde con el resultado de type ResultSetHeader (mysql2)
  RegisterServices(result.data)
    .then(result => {
      if (result.affectedRows > 0) {
        return res.status(201).json({ message: 'Usuario creado correctamente' })
      }
    })
    .catch(error => {
      const err = error as MySQLError
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'El usuario ya se encuentra regitrado' })
      }
      if (err.code === 'ECONNREFUSED') {
        return res.status(500).json({ message: 'Error de conexión con la base de datos' })
      }
      console.log(error);
      return res.status(500).json({ message: 'Error interno del servidor' })
    })
    
}