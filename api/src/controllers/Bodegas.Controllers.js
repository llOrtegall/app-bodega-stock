import { BodegaModel, ItemModel } from '../Models/Models.js'

export const createBodega = async (req, res) => {
  const { nombre, sucursal, direccion, company } = req.body
  try {
    // Validar los datos de entrada
    if (!nombre || !sucursal || !direccion) {
      return res.status(400).json({ error: 'Faltan campos requeridos' })
    }

    const newBodega = new BodegaModel({ nombre, sucursal, direccion })
    await newBodega.save()
    res.status(201).json({ message: `Bodega Creada Correctamente en ${company}` })
  } catch (error) {
    if (error.code === 11000) {
      const Code = error.code
      const Value = error.keyValue[Object.keys(error.keyValue)[0]]
      return res.status(400)
        .json({ error: `Error: ${Code}, La Bodega Con N° Sucursal: ${Value} Ya Existe ¡¡¡` })
    }
    console.error(error)
    res.status(500).json({ error: 'Error al crear la bodega' })
  }
}
// TODO: Bodegas Sin items ni simcards modificado
export const getBodegas = async (req, res) => {
  try {
    // * Excluye los campos 'items' y 'simcards'
    const bodegas = await BodegaModel.find().select('-items -simcards')
    return res.status(200).json(bodegas)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener las bodegas' })
  }
}

export const getBodegasWithItemsAndSimcardsIds = async (req, res) => {
  try {
    const bodegas = await BodegaModel.find()
    return res.status(200).json(bodegas)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener las bodegas' })
  }
}

// TODO: getBodega con sucursal
export const getBodegaSucursal = async (req, res) => {
  const { sucursal } = req.params
  if (isNaN(sucursal)) {
    res.status(400).json({ error: 'La sucursal debe ser un número' })
    return
  }
  try {
    const bodega = await BodegaModel.findOne({ sucursal }).populate('items').select('-simcards')
    if (!bodega) {
      res.status(404).json({ error: 'No se encontró la bodega con la sucursal proporcionada' })
      return
    }
    res.status(200).json(bodega)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener la bodega' })
  }
}

export const getBodegaSucursalSimcards = async (req, res) => {
  const { sucursal } = req.params
  try {
    const bodega = await BodegaModel.findOne({ sucursal }).populate('simcards')
    return res.status(200).json(bodega)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener la bodega' })
  }
}

// TODO: Retorna los ítems con las bodegas a las que pertenecen
export const findBodegaWithItems = async (req, res) => {
  try {
    const items = await ItemModel.find()
    const bodegas = await BodegaModel.find().populate('items')

    // Crea un mapa de bodegas para cada ítem
    const bodegasMap = bodegas.reduce((map, bodega) => {
      const { nombre, sucursal, _id } = bodega
      bodega.items.forEach(({ _id: itemId }) => {
        map[itemId.toString()] = { nombre, sucursal, _id }
      })
      return map
    }, {})

    // Agrega la bodega a cada ítem
    const itemsWithBodegas = items.map(item => ({
      ...item._doc,
      bodega: bodegasMap[item._id.toString()] || 'No Asignado'
    }))

    return res.status(200).json(itemsWithBodegas)
  } catch (error) {
    console.error(error)
    // Proporciona más detalles en la respuesta del error
    return res.status(500).json({ error: 'Error al obtener los ítems y las bodegas', message: error.message })
  }
}

export const addItemToBodega = async (req, res) => {
  const { sucursal, itemIds } = req.body

  if (!sucursal || !itemIds) {
    res.status(400).json({ error: 'Faltan campos requeridos' })
    return
  }

  if (itemIds.length === 0) {
    res.status(400).json({ error: 'Se debe seleccionar mínimo un Ítem.' })
    return
  }

  try {
    const bodega = await BodegaModel.findOne({ sucursal })
    if (!bodega) {
      res.status(404).json({ error: 'No se encontró la bodega con la sucursal proporcionada' })
      return
    }

    for (const itemId of itemIds) {
      const item = await ItemModel.findById(itemId)
      if (!item) {
        res.status(404).json({ error: `No se encontró el ítem con el ID: ${itemId}` })
        return
      }

      // Verifica si el ítem ya está en alguna bodega
      const existingBodega = await BodegaModel.findOne({ items: itemId })
      if (existingBodega) {
        res.status(400).json({ error: `El ítem con el ID: ${itemId} ya está en otra bodega` })
        return
      }

      bodega.items.push(item._id)
    }

    await bodega.save()
    return res.status(200).json({ message: `Ítems agregados correctamente a Bodega: ${sucursal}` })
  } catch (error) {
    return res.status(500).json({ error: 'Error al agregar los ítems a bodega', message: error })
  }
}

export const getBodegasSim = async (req, res) => {
  try {
    const bodegas = await BodegaModel.find().populate('simcards')
    return res.status(200).json(bodegas)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener las bodegas' })
  }
}

export const getBodegaSucursalItemsSimcards = async (req, res) => {
  const { id } = req.params
  try {
    const bodega = await BodegaModel.findById(id).populate('items').populate('simcards')
    return res.status(200).json(bodega)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error al obtener la bodega' })
  }
}
