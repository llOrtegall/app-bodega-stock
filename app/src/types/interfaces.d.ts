import { type LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  names: string;
  lastnames: string;
  document: number;
  username: string;
  email: string;
  company: string;
  process: string;
  sub_process: string;
  iat: number;
  exp: number;
}

interface SubItems {
  title: string
  url: string
}

export interface Items {
  title: string
  url: string
  icon?: LucideIcon
  isActive?: boolean
  items?: SubItems[]
}

export interface ActivoInsumo {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: string
  createdAt: string
  updatedAt: string
}