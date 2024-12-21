import { z } from 'zod';

export const Item = z.object({
  nombre: z.string(),
  descripcion: z.string(),
  placa: z.string(),
  serial: z.string(),
  estado: z.enum(['Disponible', 'Prestado', 'Dañado'])
})