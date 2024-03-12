import { useState, useMemo } from 'react'
import { ItemWithBodega } from '../interfaces/Item.Intece'

export function useFiltersItems(items: ItemWithBodega) {
  const [search, setSearch] = useState('')

  const filteredItems = useMemo(() => {
    return items.filter(({ nombre, placa, serial, bodega }) =>
      nombre.toLowerCase().includes(search.toLowerCase()) ||
      placa.toLowerCase().includes(search.toLowerCase()) ||
      serial.toLowerCase().includes(search.toLowerCase()) ||
      (bodega?.nombre?.toLowerCase().includes(search.toLowerCase()) || false) ||
      (bodega?.sucursal?.toString().includes(search.toLowerCase()) || false)
    )
  }, [ items, search ])

  return { search, setSearch, filteredItems }
}