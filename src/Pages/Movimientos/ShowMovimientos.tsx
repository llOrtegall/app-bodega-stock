import { useFilterMovimientos } from '../../hooks/useFilterMov'
import { getMovimientos } from '../../services/Mov.services'
import { useAuth } from '../../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Movimiento } from '../../interfaces/MovInterfaces'
import { formatFecha } from '../../utils/FormaFecha'

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

          <article className='grid grid-cols-12 px-2 text-center p-2 text-lg font-semibold bg-blue-200'>
            <p className='col-span-1 cursor-pointer hover:underline' onClick={toggleSortOrder}> N° Mov <span>{sortOrder === 'asc' ? '▼' : '▲'}</span></p>
            <p className='col-span-2'> Fecha Mov</p>
            <p className='col-span-1'> N° Incidente</p>
            <p className='col-span-2'> Encargado</p>
            <p className='col-span-2'> Origen</p>
            <p className='col-span-2'> Destino</p>
            <p className='col-span-1'> N° Item Mov</p>
            <p className='col-span-1'> N°¨Sims Mov</p>
          </article>

        <article className=''>
          {
            movimientos && sortedMovimientos.map(m => (
              <section key={m.movimientoId} onClick={() => navigate(`/movimientos/detalle/${m._id}`)} 
                className='grid grid-cols-12 text-center border-b py-1 cursor-pointer hover:bg-yellow-100'>
                <p className='col-span-1'>{m.movimientoId}</p>
                <p className='col-span-2'>{formatFecha(m.createdAt)}</p>
                <p className='col-span-1'>{m.incidente}</p>
                <p className='col-span-2'>{m.encargado}</p>
                <p className='col-span-2'>{m.bodegaOrigen?.nombre}</p>
                <p className='col-span-2'>{m.bodegaDestino?.nombre}</p>
                <p className='col-span-1'>{m.items.length}</p>
                <p className='col-span-1'>{m.simcards.entran.length + m.simcards.salen.length}</p>
              </section>
            )
            )
          }
        </article>
      </section>

    </section>
  )
}
