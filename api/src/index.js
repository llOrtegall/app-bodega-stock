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
  'http://localhost:3000',
  'http://localhost:5173',
  'http://172.20.1.194:5173'
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
app.use('/api/v1', LoginUser)

// TODO: Métodos Bodega MongoDB
app.use('/api/v1', ItemsMongoDB)
app.use('/api/v1', BodegasMongoDB)
app.use('/api/v1', MovimientosMongoDB)
app.use('/api/v1', SimcardsMongoDB)

// TODO: Métodos Información Hardware OCS Inventory
app.use('/api/v1', InfoHardRoutes)

app.listen(PORT, () => {
  console.log(`Server Iniciado En El Puerto http://localhost:${PORT}`)
})
