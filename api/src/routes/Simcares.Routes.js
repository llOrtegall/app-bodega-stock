import { createSimcard, createMultipleSimcards, updateSimcard, getSimcardWhitBodega, addSimcardToBodega } from '../controllers/Simcard.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'
import { Router } from 'express'

export const SimcardsMongoDB = Router()

SimcardsMongoDB.post('/createSimcard', setDatabaseConnection, createSimcard)

SimcardsMongoDB.post('/createMultipleSimcards', setDatabaseConnection, createMultipleSimcards)

SimcardsMongoDB.put('/updateSimcard', setDatabaseConnection, updateSimcard)

SimcardsMongoDB.get('/simcardWhitBodega/:company', setDatabaseConnection, getSimcardWhitBodega)

SimcardsMongoDB.post('/addSimcardToBodega', setDatabaseConnection, addSimcardToBodega)
