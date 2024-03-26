import { ConnetMongoDB, ConnetMongoServired } from '../connections/mongoDb.js'

export const setDatabaseConnection = async (req, res, next) => {
  const company = req.params.company || req.body.company
  if (!company) {
    return res.status(400).send('La compañía no fue proporcionada')
  }

  try {
    if (company === 'Multired') {
      await ConnetMongoDB()
    } else if (company === 'Servired') {
      await ConnetMongoServired()
    } else {
      return res.status(400).json({ error: 'La compañia no fue proporcionada correctamente' })
    }
  } catch (error) {
    console.error(error)
    return res.status(500).send('Error al conectar a la base de datos')
  }

  next()
}
