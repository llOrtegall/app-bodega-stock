import { useCallback, useEffect, useMemo, useState } from "react";
import { getMovimientos } from "../services/Mov.services";
import { Movimiento } from "../interfaces/MovInterfaces";

function Filtrar(initProp: Movimiento[]) {
  const [busMov, setBusMov] = useState('');

  const movFiltrados = useMemo(() => {
    return initProp.filter(({ incidente, encargado, movimientoId }) =>
      incidente.toLowerCase().includes(busMov.toLowerCase()) ||
      encargado.toLowerCase().includes(busMov.toLowerCase()) ||
      movimientoId.toString().toLocaleLowerCase().includes(busMov)
    );
  }, [busMov, initProp]);

  return { busMov, setBusMov, movFiltrados };
}

function FiltrarOrdMov(initProp: Movimiento[]) {
  const [sortOrder, setSortOrder] = useState('desc');

  const toggleSortOrder = useCallback(() => {
    setSortOrder(prevSortOrder => prevSortOrder === 'asc' ? 'desc' : 'asc');
  }, []);

  const sortedMovimientos = useMemo(() => {
    return [...initProp].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.movimientoId - b.movimientoId;
      } else {
        return b.movimientoId - a.movimientoId;
      }
    });
  }, [initProp, sortOrder]);

  return { sortedMovimientos, toggleSortOrder, sortOrder };
}

export const useMovimientos = (company: string) => {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMovimientos(company)
      .then(res => {
        setMovimientos(res);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
        console.log(err);
      });
  }, [company]);

  const { busMov, setBusMov, movFiltrados  } = Filtrar(movimientos);
  const { sortedMovimientos, toggleSortOrder, sortOrder } = FiltrarOrdMov(movFiltrados);


  return { sortedMovimientos, busMov, setBusMov, toggleSortOrder, sortOrder, error, loading };
};