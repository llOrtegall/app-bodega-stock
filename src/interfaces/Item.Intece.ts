interface Bodega {
  nombre: string;
  sucursal: number;
  _id: string;
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
  bodega?: Bodega;
}

export type ItemWithBodega = Item[];