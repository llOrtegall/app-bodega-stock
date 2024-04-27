import { RegisterServices } from '../services/users.services'
import { validateUser } from '../schemas/user.schema'
import { Request, Response } from 'express'

export const createUser = async (req: Request, res: Response) => {
  // TODO: recibe los datos del usuario y los valida con zod
  const result = validateUser(req.body)

  // TODO: si la validación falla, responde con un error 400 y el error del schema
  if (!result.success) {
    return res.status(400).json(result.error)
  }

  // TODO: llama al servicio de registro de usuarios y responde con el resultado de type ResultSetHeader (mysql2)
  RegisterServices(result.data)
    .then(result => { console.log(result)})
    .catch(error => { console.log(error)})
}