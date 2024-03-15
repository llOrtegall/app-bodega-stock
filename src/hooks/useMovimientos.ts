import { useCallback, useEffect, useMemo, useState } from "react";
import { Movimiento } from "../interfaces/MovInterfaces";
import { getMovimientos } from "../services/Mov.services";

function useFilterMovimientos(initialMovimientos: Movimiento[]) {
  const [searchMovimiento, setSearchMovimiento] = useState('');

  const filteredMovimientos = useMemo(() => {
    return initialMovimientos.filter(({ incidente, encargado, movimientoId }) =>
      incidente.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      encargado.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
      movimientoId.toString().toLocaleLowerCase().includes(searchMovimiento)
    );
  }, [searchMovimiento, initialMovimientos]);

  return { searchMovimiento, setSearchMovimiento, filteredMovimientos };
}

export const useMovimientos = (company: string) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [error, setError] = useState(null);

  useEffect(() => {
    getMovimientos(company)
      .then(res => {
        setMovimientos(res);
      })
      .catch(err => {
        setError(err);
        console.log(err);
      });
  }, [company]);

  const { filteredMovimientos, searchMovimiento, setSearchMovimiento } = useFilterMovimientos(movimientos);


  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
  }, []);

  const sortedMovimientos = useMemo(() => {
    return [...filteredMovimientos].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.movimientoId - b.movimientoId;
      } else {
        return b.movimientoId - a.movimientoId;
      }
    });
  }, [filteredMovimientos, sortOrder]);

  return { sortedMovimientos, searchMovimiento, setSearchMovimiento, toggleSortOrder, sortOrder, error };
};