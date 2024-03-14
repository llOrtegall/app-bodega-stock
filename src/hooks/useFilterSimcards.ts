import { useMemo, useState } from "react"

export function useFilterSimcards (initialSimcards) {
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