import { useState} from 'react'
import { Item } from '../types/Bodega'

interface FilterItems {
  searchItems: string
  setSearchItems: React.Dispatch<React.SetStateAction<string>>
  filteredItems: Item[]
}

export function useFiltersItems (items: Item[]): FilterItems  {
  const [searchItems, setSearchItems] = useState('')

  const filteredItems =
  items.filter(({ placa, nombre, serial }) =>
    placa.toLowerCase().includes(searchItems.toLowerCase()) ||
  nombre.toLowerCase().includes(searchItems.toLowerCase()) ||
    serial.toLowerCase().includes(searchItems.toLowerCase())
  )

  return { searchItems, setSearchItems, filteredItems }

}
