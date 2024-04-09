import { useFiltersBodegas } from '../hooks/useFilterBodegas'
import { getAllBodegas } from '../services/Bodegas.services'
import { useFiltersItems } from '../hooks/useFilterItems'
import { getAllItems } from '../services/Item.services'
import { type ItemsArray } from '../types/Item'
import { type Bodegas } from '../types/Bodega'
import { useState, useEffect } from 'react'

interface ItemsAndBodegas {
  items: ItemsArray
  filteredItems: ItemsArray
  searchItems: string
  setSearchItems: React.Dispatch<React.SetStateAction<string>>
  filteredBodegas: Bodegas
  searchBodega: string
  setSearchBodega: React.Dispatch<React.SetStateAction<string>>
}

export function useItemsAndBodegas (company: string, fechData: boolean): ItemsAndBodegas {
  const [items, setItems] = useState<ItemsArray>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(items)
  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  useEffect(() => {
    setTimeout(() => {
      void getAllItems(company)
        .then(data => { setItems(data) })
    }, 100)

    setTimeout(() => {
      void getAllBodegas(company)
        .then((data) => {
          setBodegas(data)
        })
    }, 1500)
  }, [fechData])

  return { filteredItems, searchItems, setSearchItems, filteredBodegas, searchBodega, setSearchBodega, items }
}
