interface Bodega {
  _id: string
  sucursal: number
  nombre: string
}

interface newItem {
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: 'Nuevo' | 'Bueno' | 'Malo' | 'DeBaja'
  company: string
}

export interface updateItem extends newItem {
  _id: string
}

interface Item {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: 'Nuevo' | 'Bueno' | 'Malo' | 'DeBaja'
  createdAt: string
  updatedAt: string
  bodega: Bodega | 'No Asignado'
}

export type ItemsArray = Item[]

// TODO: Vamos a muerte con este type ... ya que representa el estado de un item con su bodega
