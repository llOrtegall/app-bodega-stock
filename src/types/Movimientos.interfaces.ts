interface Item {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: string
  createdAt: string
  updatedAt: string
}

interface Simcard {
  _id: string
  numero: string
  operador: string
  estado: string
  serial: string
  apn: string
  user: string
  pass: string
  createdAt: string
  updatedAt: string
}

export interface Bodega {
  _id: string
  sucursal: number
  nombre: string
  direccion: string
  items: Item[]
  simcards: Simcard[]
}