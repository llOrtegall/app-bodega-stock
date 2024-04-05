import { RenderMovCom } from '../../components/Movimientos'
import { useMovimientos } from '../../hooks/useMovimientos'
import { Input, Label, Loading } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'

export function ShowMovimientos(): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa

  const { busMov, setBusMov, sortOrder, sortedMovimientos, toggleSortOrder, loading } = useMovimientos(company)

  return (
    loading
      ? (<section className='flex justify-center pt-20'><Loading>Cargando Movimientos</Loading></section>)
      : (
        <section className="">
          <article className='flex items-center justify-center py-2 gap-2 bg-blue-300 dark:bg-blue-950'>
            <Label>Filtrar Por: </Label>
            <Input type="text" value={busMov} onChange={ev => { setBusMov(ev.target.value) }} placeholder="N° Mov | N° Incidente" />
          </article >
          <section className=''>
            <article className='grid grid-cols-12 px-2 text-center p-2 font-semibold bg-blue-200 dark:bg-blue-700 dark:text-white  2xl:text-lg'>
              <p className='col-span-1 cursor-pointer hover:underline' 
                onClick={toggleSortOrder}> N° Mov <span>{sortOrder === 'asc' ? '▼' : '▲'}</span></p>
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
