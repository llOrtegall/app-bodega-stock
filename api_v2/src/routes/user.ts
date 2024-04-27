import { Router } from 'express'
import { createUser } from '../controllers/users'

export const LoginUser = Router()

// LoginUser.get('/users', getUsers)

LoginUser.post('/register', createUser)

/*
LoginUser.post('/login', getUsers)

LoginUser.get('/profile', UserByToken)


*/
