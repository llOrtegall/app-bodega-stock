import { BodegaModel, SimcardModel } from '../Models/Models.js'

export const createSimcard = async (req, res) => {
  const { numero, operador, estado, serial, apn, user, pass, company } = req.body
  if (!numero || !operador || !estado || !serial || !user || !pass || !company) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  const serialRegex = /^\d+$/
  if (!serialRegex.test(serial) || serial.length < 6) {
    return res.status(400).json({ error: 'Serial no válido. Debe ser un número de al menos 6 dígitos.' })
  }

  if (operador !== 'Claro' && operador !== 'Movistar' && operador !== 'Tigo') {
    return res.status(400).json({ error: 'Operador no valido' })
  }

  if (estado !== 'Activa' && estado !== 'Inactiva' && estado !== 'DeBaja') {
    return res.status(400).json({ error: 'Estado no valido' })
  }

  try {
    const simcard = new SimcardModel({ numero, operador, estado, serial, apn, user, pass })
    await simcard.save()
    return res.status(201).json({ message: 'Simcard creada correctamente', sims: simcard })
  } catch (error) {
    console.error(error)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]
      const value = error.keyValue[field]
      return res.status(400).json({ error: `El Campo: ${field} con el Valor: ${value} ya existe` })
    }
    return res.status(500).json({ error: 'Error al crear la simcard' })
  }
}

export const getSimcardWhitBodega = async (req, res) => {
  try {
    const simcards = await SimcardModel.find()
    const bodegas = await BodegaModel.find().populate('simcards')

    const bodegasMap = bodegas.reduce((map, bodega) => {
      bodega.simcards.forEach(item => {
        map[item._id.toString()] = { nombre: bodega.nombre, sucursal: bodega.sucursal, _id: bodega._id }
      })
      return map
    }, {})

    const itemsWithBodegas = simcards.map(item => ({
      ...item._doc,
      bodega: bodegasMap[item._id.toString()] || 'No Asignado'
    }))

    return res.status(200).json(itemsWithBodegas)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener los ítems y las bodegas' })
  }
}

export const createMultipleSimcards = async (req, res) => {
  const { simcards } = req.body

  if (!simcards || !Array.isArray(simcards) || simcards.length === 0) {
    return res.status(400).json({ error: 'Se requiere un array de simcards válido' })
  }

  const validationErrors = []
  const validSimcards = []

  // Validar cada simcard
  simcards.forEach((simcard, index) => {
    const { numero, operador, estado, serial, apn, user, pass, company } = simcard
    const errors = []

    // Validar campos requeridos
    if (!numero || !operador || !estado || !serial || !user || !pass || !company) {
      errors.push('Faltan campos requeridos')
    }

    // Validar serial
    const serialRegex = /^\d+$/
    if (serial && (!serialRegex.test(serial) || serial.length < 6)) {
      errors.push('Serial no válido. Debe ser un número de al menos 6 dígitos.')
    }

    // Validar operador
    if (operador && !['Claro', 'Movistar', 'Tigo'].includes(operador)) {
      errors.push('Operador no válido. Debe ser Claro, Movistar o Tigo')
    }

    // Validar estado
    if (estado && !['Activa', 'Inactiva', 'DeBaja'].includes(estado)) {
      errors.push('Estado no válido. Debe ser Activa, Inactiva o DeBaja')
    }

    // Validar número
    if (numero && !/^\d{10,15}$/.test(numero)) {
      errors.push('El número debe contener solo dígitos (10-15 caracteres)')
    }

    if (errors.length > 0) {
      validationErrors.push({
        index: index + 1,
        numero: numero || 'N/A',
        errors
      })
    } else {
      validSimcards.push({ numero, operador, estado, serial, apn, user, pass, company })
    }
  })

  // Si hay errores de validación, retornarlos
  if (validationErrors.length > 0) {
    return res.status(400).json({ 
      error: 'Errores de validación encontrados',
      validationErrors,
      totalSimcards: simcards.length,
      validSimcards: validSimcards.length,
      invalidSimcards: validationErrors.length
    })
  }

  try {
    // Crear todas las simcards válidas
    const createdSimcards = await SimcardModel.insertMany(validSimcards)
    
    return res.status(201).json({ 
      message: `${createdSimcards.length} simcards creadas correctamente`,
      createdCount: createdSimcards.length,
      simcards: createdSimcards
    })
  } catch (error) {
    console.error(error)
    
    // Manejar errores de duplicación
    if (error.code === 11000) {
      const duplicateErrors = []
      
      if (error.writeErrors) {
        error.writeErrors.forEach((writeError, index) => {
          if (writeError.code === 11000) {
            const field = Object.keys(writeError.keyValue)[0]
            const value = writeError.keyValue[field]
            duplicateErrors.push({
              index: index + 1,
              field,
              value,
              error: `El campo ${field} con valor ${value} ya existe`
            })
          }
        })
      } else {
        const field = Object.keys(error.keyValue)[0]
        const value = error.keyValue[field]
        duplicateErrors.push({
          field,
          value,
          error: `El campo ${field} con valor ${value} ya existe`
        })
      }
      
      return res.status(400).json({ 
        error: 'Errores de duplicación encontrados',
        duplicateErrors
      })
    }
    
    return res.status(500).json({ error: 'Error al crear las simcards masivamente' })
  }
}

export const addSimcardToBodega = async (req, res) => {
  const { sucursal, simcardIds, company } = req.body

  if (!sucursal || !simcardIds || !company) {
    res.status(400).json({ error: 'Faltan campos requeridos' })
    return
  }

  try {
    const bodega = await BodegaModel.findOne({ sucursal })
    if (!bodega) {
      res.status(404).json({ error: 'No se encontró la bodega con la sucursal proporcionada' })
      return
    }
    const simcards = await SimcardModel.find({ _id: { $in: simcardIds } })
    if (simcards.length !== simcardIds.length) {
      res.status(404).json({ error: 'Algunas tarjetas SIM no se encontraron' })
      return
    }
    const existingBodega = await BodegaModel.findOne({ simcards: { $in: simcardIds } })
    if (existingBodega) {
      res.status(400).json({ error: 'Algunas tarjetas SIM ya están en otra bodega' })
      return
    }
    bodega.simcards.push(...simcards.map(simcard => simcard._id))
    await bodega.save()

    return res.status(200).json({ message: `Simcard(s) agregadas correctamente a Bodega: ${sucursal}` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al agregar los ítems a bodega', message: error })
  }
}
