import { Router } from 'express'
import { createBodega, getBodegaSucursal, getBodegas, findItemWhitBodegas, addItemToBodega, getBodegasSim, getBodegaSucursalItemsSimcards, getBodegaSucursalSimcards, getBodegasWithItemsAndSimcardsIds, getBodegaSucursalItems } from '../controllers/Bodegas.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'

export const BodegasMongoDB = Router()

BodegasMongoDB.get('/getBodegasItemsSimcardIds/:company', setDatabaseConnection, getBodegasWithItemsAndSimcardsIds)

BodegasMongoDB.post('/createBodega', setDatabaseConnection, createBodega)

BodegasMongoDB.get('/getBodegas/:company', setDatabaseConnection, getBodegas)

BodegasMongoDB.get('/getBodega/:company/:sucursal', setDatabaseConnection, getBodegaSucursal)

BodegasMongoDB.get('/getBodegaSimcards/:company/:sucursal', setDatabaseConnection, getBodegaSucursalSimcards)

BodegasMongoDB.get('/getBodegaItems/:company/:sucursal', setDatabaseConnection, getBodegaSucursalItems)

BodegasMongoDB.get('/itemsConBodegas/:company', setDatabaseConnection, findItemWhitBodegas)

BodegasMongoDB.post('/addItemsToBodega', setDatabaseConnection, addItemToBodega)

BodegasMongoDB.get('/getBodegasSim/:company', setDatabaseConnection, getBodegasSim)

BodegasMongoDB.get('/getBodegasItemsSims/:company/:id', setDatabaseConnection, getBodegaSucursalItemsSimcards)
