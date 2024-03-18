import { useState, useMemo } from 'react'
import { type ItemsArray } from '../interfaces/Item'

interface UseFiltersItemsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  filteredItems: ItemsArray
}

export function useFiltersItems (items: ItemsArray): UseFiltersItemsProps {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(({ nombre, placa, serial, bodega }) =>
      nombre.toLowerCase().includes(search.toLowerCase()) ||
      placa.toLowerCase().includes(search.toLowerCase()) ||
      serial.toLowerCase().includes(search.toLowerCase()) ||
      (typeof bodega !== 'string' && bodega.nombre.toLowerCase().includes(search.toLowerCase())) ||
      (typeof bodega !== 'string' && bodega.sucursal.toString().includes(search.toLowerCase()))
    )
  }, [items, search])

  return { search, setSearch, filteredItems }
}
