import { Router } from 'express'
import { getUsers } from '../controllers/users'

export const LoginUser = Router()

LoginUser.get('/users', getUsers)


/*
LoginUser.post('/login', getUsers)

LoginUser.get('/profile', UserByToken)

LoginUser.post('/register', createUser)

*/
