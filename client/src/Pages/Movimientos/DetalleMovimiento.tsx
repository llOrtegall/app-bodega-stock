import { RenderDetailMov, RenderItemsMov, RenderSimcardMov } from '../../components/Movimientos'

import { useDetailMovs } from '../../hooks/useDetailMovs'
import { useAuth } from '../../Auth/AuthContext'
import { Loading } from '../../components/ui'
import { useParams } from 'react-router-dom'

export function DesatalleMovimiento (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa
  const pasarId = useParams()
  const id = pasarId.id ?? ''

  const { movimiento } = useDetailMovs({ id, company })

  return (
    (movimiento != null)
      ? (
        <main className=''>
          <RenderDetailMov mov={movimiento} />
          {movimiento.items.length > 0 ? (<RenderItemsMov items={movimiento.items} />) : null}
          {movimiento.simcards.entran.length > 0 ? (<RenderSimcardMov simcards={movimiento.simcards} />) : null}
        </main>
        )
      : (<div className='flex justify-center pt-20'><Loading> Cargando Movimiento </Loading></div>)
  )
}
