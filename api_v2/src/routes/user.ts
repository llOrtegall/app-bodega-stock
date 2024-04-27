import { Router } from 'express'
import { createUser, getUsers } from '../controllers/users'

export const LoginUser = Router()

LoginUser.post('/register', createUser)

LoginUser.get('/users', getUsers)
