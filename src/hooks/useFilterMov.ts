import { useMemo, useState } from "react"
import { Movimiento } from "../interfaces/MovInterfaces"

export function useFilterMovimientos (initialMovimientos: Movimiento[] ) {
  const [searchMovimiento, setSearchMovimiento] = useState('')

  const filteredMovimientos = useMemo(() => {
    return initialMovimientos.filter(({ incidente, encargado }) =>
      incidente.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      encargado.toLowerCase().includes(searchMovimiento.toLowerCase())
    )
  }, [searchMovimiento, initialMovimientos])

  return { searchMovimiento, setSearchMovimiento, filteredMovimientos }
}