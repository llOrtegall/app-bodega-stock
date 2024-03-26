import { Router } from 'express'
import { UserByToken, createUser, Login, getUsers } from '../controllers/users.controllers.js'

export const LoginUser = Router()

LoginUser.post('/login', Login)

LoginUser.get('/profile', UserByToken)

LoginUser.post('/register', createUser)

LoginUser.get('/users', getUsers)
