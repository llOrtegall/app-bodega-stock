import { useMemo, useState } from "react"
import { Movimiento } from "../types/MovInterfaces"

export function useFilterMovimientos (initialMovimientos: Movimiento[] ) {
  const [searchMovimiento, setSearchMovimiento] = useState('')

  const filteredMovimientos = useMemo(() => {
    return initialMovimientos.filter(({ incidente, encargado, movimientoId }) =>
      incidente.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      encargado.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      movimientoId.toString().toLocaleLowerCase().includes(searchMovimiento)
    )
  }, [searchMovimiento, initialMovimientos])

  return { searchMovimiento, setSearchMovimiento, filteredMovimientos }
}