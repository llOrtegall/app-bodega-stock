import { createItem, getItems, deleteItem, updateItem, getItem } from '../controllers/Items.Controllers.js'
import { setDatabaseConnection } from '../middleware/setDatabase.js'
import { Router } from 'express'

export const ItemsMongoDB = Router()

ItemsMongoDB.post('/createItem', setDatabaseConnection, createItem)

ItemsMongoDB.get('/getItem/:company/:id', setDatabaseConnection, getItem)

// TODO: get all items from a company
ItemsMongoDB.get('/getItems/:company', setDatabaseConnection, getItems)

ItemsMongoDB.patch('/updateItem', setDatabaseConnection, updateItem)

ItemsMongoDB.delete('/deleteItem/:company/:id', setDatabaseConnection, deleteItem)
