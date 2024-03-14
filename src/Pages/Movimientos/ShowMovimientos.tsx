import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFilterMovimientos } from '../../hooks/useFilterMov'
import { useAuth } from '../../Auth/AuthContext'
import { getMovimientos } from '../../services/Mov.services'

export function ShowMovimientos () {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [movimientos, setMovimientos] = useState([])
  const [sortOrder, setSortOrder] = useState('desc')
  const navigate = useNavigate()

  useEffect(() => {
    getMovimientos(company)
      .then(res => {
        setMovimientos(res)
      }).catch(err => {
        console.log(err)
      })
  }, [])

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const { filteredMovimientos, searchMovimiento, setSearchMovimiento } = useFilterMovimientos(movimientos)

  const sortedMovimientos = filteredMovimientos.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.movimientoId - b.movimientoId
    } else {
      return b.movimientoId - a.movimientoId
    }
  })

  return (
    <section className="w-full h-[93vh] overflow-auto">

      <article className='p-2 bg-blue-700 flex items-center justify-center'>
        <label className='pr-2 font-semibold'>Filtro: N° Incidente | Encargado : </label>
        <input type="text" value={searchMovimiento} onChange={ev => setSearchMovimiento(ev.target.value)} placeholder="Buscar Movimiento..."
          className="bg-slate-200 w-64 p-1 rounded-md border border-black" />
      </article>

      <table className='w-full'>
        <thead className='text-sm uppercase'>
          <tr>
            <th className="bg-blue-600 cursor-pointer hover:underline" onClick={toggleSortOrder}> N° Mov <span>{sortOrder === 'asc' ? '▼' : '▲'}</span></th>
            <th className='bg-blue-600'> Fecha Mov</th>
            <th className='bg-blue-600'> N° Incidente</th>
            <th className='bg-blue-600'> Encargado</th>
            <th className='bg-blue-600'> Origen</th>
            <th className='bg-blue-600'> Destino</th>
            <th className='bg-blue-600'> Cant Items Mov</th>
            <th className='bg-blue-600'> Cant Sims Mov</th>
          </tr>
        </thead>
        <tbody className='border-b border-t border-black'>
          {
            movimientos && sortedMovimientos.map(m => (
              <tr key={m.movimientoId} onClick={() => navigate(`/movimientos/detalle/${m._id}`)} className='cursor-pointer hover:bg-yellow-200'>
                <td>{m.movimientoId}</td>
                <td>{m.fecha}</td>
                <td>{m.incidente}</td>
                <td>{m.encargado}</td>
                <td>{m.bodegaOrigen?.nombre}</td>
                <td>{m.bodegaDestino?.nombre}</td>
                <td>{m.items.length}</td>
                <td>{m.simcards.entran.length + m.simcards.salen.length}</td>
              </tr>
            )
            )
          }
        </tbody>
      </table>

    </section>
  )
}
