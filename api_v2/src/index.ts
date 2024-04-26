import express from 'express'
import { LoginUser } from './routes/user'
import morgan from 'morgan'
import 'dotenv/config'

const app = express()
app.use(morgan('dev'))
const PORT = process.env.PUERTO_API

app.use('/api/v2', LoginUser)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
