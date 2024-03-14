import { useMemo, useState } from "react"

export function useFilterMovimientos (initialMovimientos) {
  const [searchMovimiento, setSearchMovimiento] = useState('')

  const filteredMovimientos = useMemo(() => {
    return initialMovimientos.filter(({ incidente, encargado }) =>
      incidente.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      encargado.toLowerCase().includes(searchMovimiento.toLowerCase())
    )
  }, [searchMovimiento, initialMovimientos])

  return { searchMovimiento, setSearchMovimiento, filteredMovimientos }
}