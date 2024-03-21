import { useState } from 'react'
import { type SimcardsArray } from '../types/Simcard.interfaces'

interface FilterSimcards {
  searchSimcard: string
  setSearchSimcard: React.Dispatch<React.SetStateAction<string>>
  filteredSimcards: SimcardsArray
}

export function useFilterSimcards (simcards: SimcardsArray): FilterSimcards {
  const [searchSimcard, setSearchSimcard] = useState('')

  const filteredSimcards =
  simcards.filter(({ numero, operador, serial }) =>
    numero.toLowerCase().includes(searchSimcard.toLowerCase()) ||
    operador.toLowerCase().includes(searchSimcard.toLowerCase()) ||
    serial.toLowerCase().includes(searchSimcard.toLowerCase())
  )

  return { searchSimcard, setSearchSimcard, filteredSimcards }
}
