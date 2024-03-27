import { RenderMovCom } from '../../components/Movimientos'
import { useMovimientos } from '../../hooks/useMovimientos'
import { Input, Label, Loading } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'

export function ShowMovimientos (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa

  const { busMov, setBusMov, sortOrder, sortedMovimientos, toggleSortOrder, loading } = useMovimientos(company)

  return (
    loading
      ? (<section className='flex items-center justify-center pt-20'><Loading>Cargando Movimientos</Loading></section>)
      : (
        <section className="w-full h-[92vh] overflow-auto lg:text-xs 2xl:text-lg">
          <article className='flex  justify-center items-center bg-blue-800 p-2 gap-2'>
            <div className='w-[120px]'>
              <Label textColor='text-white'>Filtrar Por: </Label>
            </div>
            <div className='w-1/3'>
              <Input type="text" value={busMov} onChange={ev => { setBusMov(ev.target.value) }} placeholder="N° Mov | N° Incidente"/>
            </div>
          </article >
          <section className='w-full'>
            <article className='grid grid-cols-12 px-2 text-center p-2 font-semibold bg-blue-200'>
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
