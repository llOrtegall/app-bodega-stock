import { RenderDetailMov, RenderItemsMov, RenderSimcardMov } from '../../components/Movimientos'

import { getMovimiento } from '../../services/Mov.services'
import { Movimiento } from '../../interfaces/MovInterfaces'
import { Loading } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function DesatalleMovimiento() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const { id } = useParams()

  const [movimiento, setMovimiento] = useState<Movimiento>()

  useEffect(() => {
    getMovimiento(company, id || '')
      .then(res => setMovimiento(res))
      .catch(err => console.log(err))
  }, [id, company])

  return (
    movimiento
      ? (
        <main className='flex flex-col gap-4 h-[92vh]'>
          <RenderDetailMov mov={movimiento} />
          {movimiento.items.length > 0 ? (<RenderItemsMov items={movimiento.items} />) : null}
          {movimiento.simcards.entran.length > 0 ? (<RenderSimcardMov simcards={movimiento.simcards} />) : null}
        </main>
      )
      : <main className='flex flex-col w-full h-[92vh] justify-center items-center'>
          <Loading />
          <h1>Cargando ...</h1>
        </main>
  )
}
