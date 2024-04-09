import { BodegaModel, MovimientoModel } from '../Models/Models.js'
// import { sendEmailReport } from '../utils/funtionsReutilizables.js' // * Implementar en Producción
import moment from 'moment-timezone'

export const getMovimientos = async (req, res) => {
  try {
    const movimientos = await MovimientoModel.find()
      .populate('items').populate('bodegaOrigen').populate('bodegaDestino')
      .populate('simcards.entran').populate('simcards.salen')
    return res.status(200).json(movimientos)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener los movimientos' })
  }
}

export const moveItems = async (req, res) => {
  console.log(req.body);

  const { itemsIds, bodegas, encargado, incidente, descripcion, company } = req.body

  if (!itemsIds || !bodegas || !encargado || !incidente || !descripcion || !company) {
    return res.status(400).json({ error: 'Faltan campos requeridos Bod Origen ? y/o Destino ?' })
  }

  if(itemsIds.entran.length === 0) {
    return res.status(400).json({ error: 'Debe seleccionar Mínimo ( 1 ) Item Para El Movimiento' })
  }

  if(bodegas.bodegaOrigen === bodegas.bodegaDestino) {
    return res.status(400).json({ error: 'La bodega de Origen y Destino deben ser Diferentes' })
  }

  try {
    // Encuentra las bodegas
    const sourceBodega = await BodegaModel.findById(bodegas.bodegaOrigen)
    const targetBodega = await BodegaModel.findById(bodegas.bodegaDestino)

    for (const itemId of itemsIds.entran) {
      // Encuentra el ítem en la bodega original
      const itemIndex = sourceBodega.items.findIndex(item => item._id.toString() === itemId)

      // Elimina el ítem de la bodega original
      const [item] = sourceBodega.items.splice(itemIndex, 1)

      // Agrega el ítem a la bodega de destino
      targetBodega.items.push(item)
    }

    for (const itemid of itemsIds.salen) {
      // Encuentra el ítem en la bodega original
      const itemIndex = targetBodega.items.findIndex(item => item._id.toString() === itemid)

      // Elimina el ítem de la bodega original
      const [item] = targetBodega.items.splice(itemIndex, 1)

      // Agrega el ítem a la bodega de destino
      sourceBodega.items.push(item)
    }

    const movimientoId = await MovimientoModel.countDocuments() + 1

    const movimiento = new MovimientoModel({
      movimientoId,
      encargado,
      incidente,
      descripcion,
      fecha: moment().tz('America/Bogota').toDate(),
      items: itemsIds,
      simcards: [],
      bodegaOrigen: bodegas.bodegaOrigen,
      bodegaDestino: bodegas.bodegaDestino
    })

    await movimiento.save()

    // Guarda los cambios en las bodegas
    await sourceBodega.save()
    await targetBodega.save()

    return res.status(200).json({ message: 'Items movidos con éxito' })
  } catch (error) {
    if (error.code === 11000) {
      console.log(error)
      const Code = error.code
      const name = Object.keys(error.keyValue)[0]
      const Value = error.keyValue[Object.keys(error.keyValue)[0]]
      return res.status(400)
        .json({ error: `Error: ${Code}, ${name} = ${Value} Ya Existe !!!` })
    }
    return res.status(500).json({ error: 'Error al mover los Simcards' })
  }
}

export const moveSimcards = async (req, res) => {
  const { simsIds, bodegas, encargado, incidente, descripcion, company } = req.body

  if (!simsIds || !bodegas || !encargado || !incidente || !descripcion || !company) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  if (simsIds.entran.length === 0) {
    return res.status(400).json({ error: 'Debe seleccionar Mínimo ( 1 ) Simcard Para El Movimiento' })
  }

  if (bodegas.bodegaOrigen === bodegas.bodegaDestino) {
    return res.status(400).json({ error: 'La bodega de Origen y Destino deben ser Diferentes' })
  }

  try {
    // Encuentra las bodegas
    const sourceBodega = await BodegaModel.findById(bodegas.bodegaOrigen)
    const targetBodega = await BodegaModel.findById(bodegas.bodegaDestino)

    // Mueve cada ítem del array itemsIdsmoveItems
    for (const itemId of simsIds.entran) {
      // Encuentra el ítem en la bodega original
      const itemIndex = sourceBodega.simcards.findIndex(item => item._id.toString() === itemId)

      // Elimina el ítem de la bodega original
      const [item] = sourceBodega.simcards.splice(itemIndex, 1)

      // Agrega el ítem a la bodega de destino
      targetBodega.simcards.push(item)
    }

    for (const itemid of simsIds.salen) {
      // Encuentra el ítem en la bodega original
      const itemIndex = targetBodega.simcards.findIndex(item => item._id.toString() === itemid)

      // Elimina el ítem de la bodega original
      const [item] = targetBodega.simcards.splice(itemIndex, 1)

      // Agrega el ítem a la bodega de destino
      sourceBodega.simcards.push(item)
    }
    const movimientoId = await MovimientoModel.countDocuments() + 1

    const movimiento = new MovimientoModel({
      movimientoId,
      encargado,
      incidente,
      descripcion,
      fecha: moment().tz('America/Bogota').toDate(),
      items: [],
      simcards: simsIds,
      bodegaOrigen: bodegas.bodegaOrigen,
      bodegaDestino: bodegas.bodegaDestino
    })

    await movimiento.save()

    // Guarda los cambios en las bodegas
    await sourceBodega.save()
    await targetBodega.save()

    return res.status(200).json({ message: 'Simcards movidas con éxito' })
  } catch (error) {
    if (error.code === 11000) {
      console.log(error)
      const Code = error.code
      const name = Object.keys(error.keyValue)[0]
      const Value = error.keyValue[Object.keys(error.keyValue)[0]]
      return res.status(400)
        .json({ error: `Error: ${Code}, ${name} = ${Value} Ya Existe !!!` })
    }
    return res.status(500).json({ error: 'Error al mover los Simcards' })
  }
}

export const getMovimiento = async (req, res) => {
  const { id, company } = req.params

  if (!id || !company) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    const movimiento = await MovimientoModel.findById(id).populate('items')
      .populate('items.entran', 'nombre placa descripcion serial estado')
      .populate('items.salen', 'nombre placa descripcion serial estado')
      .populate('simcards.entran', 'numero operador serial estado')
      .populate('simcards.salen', 'numero operador serial estado')
      .populate('bodegaOrigen').populate('bodegaDestino')
    return res.status(200).json(movimiento)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener el movimiento' })
  }
}
