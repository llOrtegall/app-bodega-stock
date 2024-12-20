import { getHardWare, getHardWareByActivo, getInfoV2 } from '../controllers/infoHard.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'
import { Router } from 'express'

export const InfoHardRoutes = Router()

InfoHardRoutes.post('/info', getHardWareByActivo)

InfoHardRoutes.get('/info/:company', getHardWare)

InfoHardRoutes.get('/info2/:company', setDatabaseConnection, getInfoV2)
