import { ItemsArray } from '../types/Item'
import { useState} from 'react'

interface FilterItems {
  searchItems: string
  setSearchItems: React.Dispatch<React.SetStateAction<string>>
  filteredItems: ItemsArray
}

export function useFiltersItems (items: ItemsArray): FilterItems  {
  const [searchItems, setSearchItems] = useState('')

  const filteredItems =
  items.filter(({ placa, nombre, serial }) =>
    placa.toLowerCase().includes(searchItems.toLowerCase()) ||
  nombre.toLowerCase().includes(searchItems.toLowerCase()) ||
    serial.toLowerCase().includes(searchItems.toLowerCase())
  )

  return { searchItems, setSearchItems, filteredItems }

}
