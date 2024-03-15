import { useEffect, useState } from "react";
import { Movimiento } from "../interfaces/MovInterfaces";
import { getMovimiento } from "../services/Mov.services";

export function useDetailMovs({ id, company}: { id: string, company: string }) {
  const [movimiento, setMovimiento] = useState<Movimiento>()

  useEffect(() => {
    getMovimiento(company, id)
      .then(res => setMovimiento(res))
      .catch(err => console.log(err))
  }, [id, company])

  return({ movimiento })
}