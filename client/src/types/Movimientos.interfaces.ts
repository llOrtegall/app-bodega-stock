import { type Movimiento } from './Movimiento'

export interface FiltrosInt {
  busMov: string
  setBusMov: (val: string) => void
  movFiltrados: Movimiento[]
}

export interface FiltrosOrdInt {
  sortedMovimientos: Movimiento[]
  toggleSortOrder: () => void
  sortOrder: string
}

export interface MovimientosInt {
  sortedMovimientos: Movimiento[]
  busMov: string
  setBusMov: (val: string) => void
  toggleSortOrder: () => void
  sortOrder: string
  error: string
  loading: boolean
}
