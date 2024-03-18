import { useMemo, useState } from "react"
import { SimcardWithBodega } from "../types/Simcard.interfaces"

export function useFilterSimcards (initialSimcards: SimcardWithBodega[]) {
  const [searchSimcard, setSearchSimcard] = useState('')

  const filteredSimcards = useMemo(() => {
    return initialSimcards.filter(({ numero, operador, serial }) =>
      numero.toLowerCase().includes(searchSimcard.toLowerCase()) ||
      operador.toLowerCase().includes(searchSimcard.toLowerCase()) ||
      serial.toLowerCase().includes(searchSimcard.toLowerCase())
    )
  }, [searchSimcard, initialSimcards])

  return { searchSimcard, setSearchSimcard, filteredSimcards }
}