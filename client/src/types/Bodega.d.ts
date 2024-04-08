interface Bodega {
  _id: string
  nombre: string
  direccion: string
  sucursal: number
  created_at: string | undefined
  updated_at: string | undefined
  items?: string[]
  simcards?: string[]
}

export interface Item {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: string
  createdAt?: string
  updatedAt?: string
}

export interface Simcard {
  _id: string
  numero: string
  operador: string
  estado: string
  serial: string
  apn: string
  user: string
  pass: string
  createdAt?: string
  updatedAt?: string
}

export interface createBodega {
  nombre: string
  sucursal: string
  direccion: string
  company: string
}

// * Extiende la interfaz Bodega para incluir los items y simcards de las interfaces Item y Simcard
export type BodegaIntIS = Omit<Bodega, 'items' | 'simcards'> & {
  items: Item[]
  simcards: Simcard[]
}

export type BodegaWithItems = Omit<Bodega, 'items' | 'simcards'> & {
  items: Item[]
}

export type Bodegas = Bodega[]
