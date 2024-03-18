import { useMemo, useState } from 'react'
import { type BodegaIntIS } from '../types/Bodega'

export function useFiltersBodegas (initialBodegas: BodegaIntIS[]) {
  const [searchBodega, setSearchBodega] = useState('')

  const filteredBodegas = useMemo(() => {
    return initialBodegas.filter(({ nombre, sucursal, direccion }) =>
      nombre.toLowerCase().includes(searchBodega.toLowerCase()) ||
      sucursal.toString().toLowerCase().includes(searchBodega.toLowerCase()) ||
      direccion.toLowerCase().includes(searchBodega.toLowerCase())
    )
  }, [searchBodega, initialBodegas])

  return { searchBodega, setSearchBodega, filteredBodegas }
}
