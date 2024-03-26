import { getHardWare, getHardWareByActivo } from '../controllers/infoHard.Controllers.js'
import { Router } from 'express'

export const InfoHardRoutes = Router()

InfoHardRoutes.post('/info', getHardWareByActivo)

InfoHardRoutes.get('/info/:company', getHardWare)
