import { Router } from 'express'
import { createBodega, getBodegaSucursal, getBodegas, findItemWhitBodegas, addItemToBodega, getBodegasSim, getBodegaSucursalItemsSimcards, getBodegaSucursalSimcards, getBodegasWithItemsAndSimcardsIds, getBodegaSucursalItems } from '../controllers/Bodegas.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'

export const BodegasMongoDB = Router()

// TODO: Bodegas Sin items ni simcards modificado [:ok:]
BodegasMongoDB.get('/getBodegasItemsSimcardIds/:company', setDatabaseConnection, getBodegasWithItemsAndSimcardsIds)

BodegasMongoDB.post('/createBodega', setDatabaseConnection, createBodega)

// TODO: Bodegas [:ok:]
BodegasMongoDB.get('/getBodegas/:company', setDatabaseConnection, getBodegas)

// TODO: getBodega [:ok:]
BodegasMongoDB.get('/getBodega/:company/:sucursal', setDatabaseConnection, getBodegaSucursal)

// TODO: getBodegaSimcards [:ok:]
BodegasMongoDB.get('/getBodegaSimcards/:company/:sucursal', setDatabaseConnection, getBodegaSucursalSimcards)

// TODO: getBodegaItems [:ok:]
BodegasMongoDB.get('/getBodegaItems/:company/:sucursal', setDatabaseConnection, getBodegaSucursalItems)

// TODO: Items con bodegas [:ok:]
BodegasMongoDB.get('/itemsConBodegas/:company', setDatabaseConnection, findItemWhitBodegas)

BodegasMongoDB.post('/addItemsToBodega', setDatabaseConnection, addItemToBodega)

BodegasMongoDB.get('/getBodegasSim/:company', setDatabaseConnection, getBodegasSim)

// TODO: Bodegas con items y simcards [:ok:]
BodegasMongoDB.get('/getBodegasItemsSims/:company/:id', setDatabaseConnection, getBodegaSucursalItemsSimcards)
