import 'dotenv/config.js'

import { MovimientosMongoDB } from './routes/Movimientos.Routes.js'
import { SimcardsMongoDB } from './routes/Simcares.Routes.js'
import { BodegasMongoDB } from './routes/Bodegas.Routes.js'
import { InfoHardRoutes } from './routes/Info.Routes.js'
import { ItemsMongoDB } from './routes/Items.Routes.js'
import { LoginUser } from './routes/users.routes.js'

import cookieParser from 'cookie-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://aplicaciones.gane.com',
]

const app = express()

app.disable('x-powered-by')
const PORT = process.env.PUERTO_API || 3000

app.use(cors({
  credentials: true,
  origin: ACCEPTED_ORIGINS
}))

app.use(morgan('dev'))

app.use(cookieParser())
app.use(express.json())

// TODO: Metodos En Usuarios Login
app.use('/api', LoginUser)

// TODO: Métodos Bodega MongoDB
app.use('/api', ItemsMongoDB)
app.use('/api', BodegasMongoDB)
app.use('/api', MovimientosMongoDB)
app.use('/api', SimcardsMongoDB)

// TODO: Métodos Información Hardware OCS Inventory
app.use('/api', InfoHardRoutes)

app.listen(PORT, () => {
  console.log(`Server Iniciado En El Puerto http://localhost:${PORT}`)
})
