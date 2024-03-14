import { useFilterMovimientos } from '../../hooks/useFilterMov'
import { getMovimientos } from '../../services/Mov.services'
import { useAuth } from '../../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Movimiento } from '../../interfaces/MovInterfaces'

export function ShowMovimientos() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [movimientos, setMovimientos] = useState<Movimiento[]>([])
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

  const sortedMovimientos = filteredMovimientos.sort((a: { movimientoId: number }, b: { movimientoId: number }) => {
    if (sortOrder === 'asc') {
      return a.movimientoId - b.movimientoId
    } else {
      return b.movimientoId - a.movimientoId
    }
  })

  return (
    <section className="w-full h-[90vh] overflow-auto">

      <article className='p-2 bg-blue-700 flex items-center justify-center'>
        <label className='pr-2 font-semibold'>Filtro: N° Incidente | Encargado : </label>
        <input type="text" value={searchMovimiento} onChange={ev => setSearchMovimiento(ev.target.value)} placeholder="Buscar Movimiento..."
          className="bg-slate-200 w-64 p-1 rounded-md border border-black" />
      </article>

      <section className='w-full'>

          <article className='flex justify-between px-4 py-2 font-semibold bg-blue-300 text-center'>
            <p className='w-1/12 cursor-pointer hover:underline' onClick={toggleSortOrder}> N° Mov <span>{sortOrder === 'asc' ? '▼' : '▲'}</span></p>
            <p className='w-1/12'> Fecha Mov</p>
            <p className='w-1/12'> N° Incidente</p>
            <p className='w-1/12'> Encargado</p>
            <p className='w-2/12'> Origen</p>
            <p className='w-2/12'> Destino</p>
            <p className='w-1/12'> Cant Items Mov</p>
            <p className='w-1/12'> Cant Sims Mov</p>
          </article>

        <article className='flex flex-col'>
          {
            movimientos && sortedMovimientos.map(m => (
              <section key={m.movimientoId} onClick={() => navigate(`/movimientos/detalle/${m._id}`)} 
                className='flex w-full items-center justify-between px-2 cursor-pointer hover:bg-yellow-100 text-center border'>
                <p className='w-1/12'>{m.movimientoId}</p>
                <p className='w-1/12'>{m.createdAt}</p>
                <p className='w-1/12'>{m.incidente}</p>
                <p className='w-1/12'>{m.encargado}</p>
                <p className='w-2/12'>{m.bodegaOrigen?.nombre}</p>
                <p className='w-2/12'>{m.bodegaDestino?.nombre}</p>
                <p className='w-1/12'>{m.items.length}</p>
                <p className='w-1/12'>{m.simcards.entran.length + m.simcards.salen.length}</p>
              </section>
            )
            )
          }
        </article>
      </section>

    </section>
  )
}
