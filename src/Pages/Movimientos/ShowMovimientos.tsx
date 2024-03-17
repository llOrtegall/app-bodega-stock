import { RenderMovCom } from '../../components/Movimientos'
import { useMovimientos } from '../../hooks/useMovimientos'
import { useAuth } from '../../Auth/AuthContext'
import { Loading } from '../../components/ui'

export function ShowMovimientos() {
  const { user } = useAuth()
  const company = user?.empresa || ''

  const { busMov, setBusMov, sortOrder, sortedMovimientos, toggleSortOrder, loading } = useMovimientos(company)


  return (
    loading ? (<Loading>Cargando Movimientos</Loading>)
      :
      (
        <section className="w-full h-[92vh] overflow-auto">
          <article className='p-2 bg-blue-700 flex items-center justify-center'>
            <label className='pr-2 font-semibold'>Filtro: N° Incidente | Encargado : </label >
            <input type="text" value={busMov} onChange={ev => setBusMov(ev.target.value)} placeholder="Buscar Movimiento..."
              className="bg-slate-200 w-64 p-1 rounded-md border border-black" />
          </article >
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

            {sortedMovimientos.map(m => <RenderMovCom key={m._id} movimiento={m} />)}

          </section>

        </section >
      )
  )
}
