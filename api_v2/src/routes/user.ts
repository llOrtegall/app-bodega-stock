import { createUser, getUsers, loginUser } from '../controllers/users'
import { Router } from 'express'

export const LoginUser = Router()

LoginUser.post('/register', createUser)

LoginUser.post('/login', loginUser)

LoginUser.get('/users', getUsers)
