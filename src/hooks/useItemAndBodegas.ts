import { useState, useEffect } from 'react'
import { useFiltersBodegas } from '../hooks/useFilterBodegas'
import { getAllBodegas } from '../services/Bodegas.services'
import { useFiltersItems } from '../hooks/useFilterItems'
import { getAllItems } from '../services/Item.services'
import { type ItemsArray } from '../interfaces/Item'
import { type Bodegas } from '../interfaces/Bodega'

interface ItemsAndBodegas {
  items: ItemsArray
  filteredItems: ItemsArray
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
  filteredBodegas: Bodegas
  searchBodega: string
  setSearchBodega: React.Dispatch<React.SetStateAction<string>>
}

export function useItemsAndBodegas (company: string): ItemsAndBodegas {
  const [items, setItems] = useState<ItemsArray>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  const { filteredItems, search, setSearch } = useFiltersItems(items)
  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  useEffect(() => {
    setTimeout(() => {
      void getAllBodegas(company)
        .then((data) => {
          setBodegas(data)
        })
    }, 300)

    setTimeout(() => {
      void getAllItems(company)
        .then(data => { setItems(data) })
    }, 600)
  }, [company])

  return { filteredItems, search, setSearch, filteredBodegas, searchBodega, setSearchBodega, items }
}
