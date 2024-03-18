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

export type Bodegas = Bodega[]
