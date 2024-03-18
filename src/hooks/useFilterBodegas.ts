import { useMemo, useState } from 'react'
import { type Bodegas } from '../types/Bodega'

interface IOFilterBodegas {
  searchBodega: string
  setSearchBodega: (value: string) => void
  filteredBodegas: Bodegas
}

export function useFiltersBodegas (initialBodegas: Bodegas): IOFilterBodegas {
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
