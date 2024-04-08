import { type Movimiento } from '../../types/Movimiento'
import { formatFecha } from '../../utils/FormaFecha'
import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'

interface Props {
  movimiento: Movimiento
}

export function RenderMovCom({ movimiento }: Props): JSX.Element {
  const { _id, createdAt, incidente, encargado, bodegaOrigen, bodegaDestino, items, simcards } = movimiento
  const navigate = useNavigate()

  const handleOnClick = useCallback(() => {
    navigate(`/movimientos/detalle/${_id}`)
  }, [navigate, _id])

  return (

    <section key={movimiento.movimientoId} onClick={handleOnClick}
      className='grid grid-cols-12 text-xs xl:text-sm 2xl:text-base text-center border-b py-1 gap-2 dark:border-b-blue-950 cursor-pointer dark:hover:text-black hover:bg-yellow-100 dark:text-white'>
      <p className='truncate col-span-1'>{movimiento.movimientoId}</p>
      <p className='truncate col-span-2'>{formatFecha(createdAt)}</p>
      <p className='truncate col-span-1'>{incidente}</p>
      <p className='truncate col-span-2'>{encargado}</p>
      <p className='truncate col-span-2'>{bodegaOrigen?.nombre}</p>
      <p className='truncate col-span-2'>{bodegaDestino?.nombre}</p>
      <p className='truncate col-span-1'>{items.length}</p>
      <p className='truncate col-span-1'>{simcards.entran.length + simcards.salen.length} </p>
    </section>
  )
}
