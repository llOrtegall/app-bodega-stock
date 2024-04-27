import { Router } from 'express'
import { createUser, getUsers, loginUser } from '../controllers/users'

export const LoginUser = Router()

LoginUser.post('/register', createUser)

LoginUser.get('/users', getUsers)

LoginUser.post('/login', loginUser)
