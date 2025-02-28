import { ActivoInsumo } from "./interfaces";
import { Simcard } from "./Simcard";

export interface Bodega {
  _id: string;
  sucursal: number;
  nombre: string;
  direccion: string;
  items: string[];
  simcards: string[];
  updatedAt: string;
}

export interface BodegaItemsSimcard {
  _id: string;
  sucursal: number;
  nombre: string;
  direccion: string;
  items: ActivoInsumo[];
  simcards: Simcard[];
  updatedAt: string;
}

export interface BodegaWhitItems {
  _id: string;
  sucursal: number;
  nombre: string;
  direccion: string;
  items: ActivoInsumo[];
}

export type newBodega = Omit<Bodega, '_id' | 'updatedAt' | 'items' | 'simcards'>;