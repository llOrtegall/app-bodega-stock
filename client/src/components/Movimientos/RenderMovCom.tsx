import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Movimiento } from '../../types/Movimiento'
import { formatFecha } from '../../utils/FormaFecha'

interface Props {
  movimiento: Movimiento
}

export function RenderMovCom (
  { movimiento: { movimientoId, createdAt, incidente, encargado, bodegaOrigen, bodegaDestino, items, simcards, _id } }: Props): JSX.Element {
  const navigate = useNavigate()

  const handleOnClick = useCallback(() => {
    navigate(`/movimientos/detalle/${_id}`)
  }, [navigate, _id])

  return (
    <section key={movimientoId} onClick={handleOnClick}
      className='grid grid-cols-12 h-6 2xl:h-10 text-center border-b dark:border-b-blue-950 py-1 cursor-pointer dark:hover:text-black hover:bg-yellow-100 dark:text-white text-xs 2xl:text-lg text-clip'>
      <p className='col-span-1'>{movimientoId}</p>
      <p className='col-span-2'>{formatFecha(createdAt)}</p>
      <p className='col-span-1'>{incidente}</p>
      <p className='col-span-2'>{encargado}</p>
      <p className='col-span-2'>{bodegaOrigen?.nombre}</p>
      <p className='col-span-2'>{bodegaDestino?.nombre}</p>
      <p className='col-span-1'>{items.length}</p>
      <p className='col-span-1'>{simcards.entran.length + simcards.salen.length}</p>
    </section>
  )
}
