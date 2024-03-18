interface Bodega {
  _id: string;
  sucursal: number;
  nombre: string;
  direccion: string;
}

interface Simcard {
  _id: string;
  numero: string;
  operador: string;
  estado: string;
  serial: string;
  apn: string;
  user: string;
  pass: string;
  createdAt: string;
  updatedAt: string;
}

interface Item {
  _id: string;
  nombre: string;
  descripcion: string;
  placa: string;
  serial: string;
  estado: string;
  createdAt: string;
  updatedAt: string;
}

export interface Movimiento {
  simcards: { entran: Simcard[]; salen: Simcard[] };
  _id: string;
  movimientoId: number;
  encargado: string;
  incidente: string;
  descripcion: string;
  fecha: string;
  items: Item[];
  bodegaOrigen: Bodega;
  bodegaDestino: Bodega;
  createdAt: string;
  updatedAt: string;
}
