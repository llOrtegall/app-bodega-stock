import { createSimcard, createMultipleSimcards, getSimcardWhitBodega, addSimcardToBodega } from '../controllers/Simcard.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'
import { Router } from 'express'

export const SimcardsMongoDB = Router()

SimcardsMongoDB.post('/createSimcard', setDatabaseConnection, createSimcard)

SimcardsMongoDB.post('/createMultipleSimcards', setDatabaseConnection, createMultipleSimcards)

SimcardsMongoDB.get('/simcardWhitBodega/:company', setDatabaseConnection, getSimcardWhitBodega)

SimcardsMongoDB.post('/addSimcardToBodega', setDatabaseConnection, addSimcardToBodega)
