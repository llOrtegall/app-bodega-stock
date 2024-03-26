import { useEffect, useState } from 'react'
import { type Movimiento } from '../types/Movimiento'
import { getMovimiento } from '../services/Mov.services'

export function useDetailMovs ({ id, company }: { id: string, company: string }): { movimiento?: Movimiento } {
  const [movimiento, setMovimiento] = useState<Movimiento>()

  useEffect(() => {
    getMovimiento(company, id)
      .then(res => { setMovimiento(res as Movimiento) })
      .catch(err => { console.log(err) })
  }, [id, company])

  return ({ movimiento })
}
