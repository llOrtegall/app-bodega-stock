export interface Bodega {
  _id: string;
  sucursal: number;
  nombre: string;
}

export interface BodegaIntIS extends Bodega{
  direccion: string;
  items: string[];
  simcards: string[];
}