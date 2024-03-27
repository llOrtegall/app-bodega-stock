import { type Movimiento } from '../../types/Movimiento'
import { formatFecha } from '../../utils/FormaFecha'
import { Card } from '@tremor/react'

export function RenderDetailMov({ mov }: { mov: Movimiento }): JSX.Element {
  const { bodegaOrigen, bodegaDestino, descripcion, encargado, fecha, incidente, items, movimientoId, simcards } = mov

  return (
    <article className='bg-slate-400'>
      <section className='black'>
        <h1 className="text-lg text-center text-white bg-blue-600 p-2  uppercase">Información Del Movimiento</h1>
      </section>

      <section className='grid lg:grid-cols-2 2xl:grid-cols-4 gap-2 p-2'>

        <Card className='flex flex-col gap-2 dark:text-white'>
          <div className='flex justify-between'>
            <p className='font-semibold'>N° Incidente: </p>
            <span>{incidente}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Encargado:</p>
            <span>{encargado}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Fecha y Hora: </p>
            <span>{formatFecha(fecha)}</span>
          </div>
        </Card>

        <Card className='flex flex-col gap-2 dark:text-white'>
          <div className='flex justify-between'>
            <p className='font-semibold'>Cantidad De Simcards Movidas:</p>
            <span>{simcards.entran.length + simcards.salen.length}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>Cantidad De Items Movidos:</p>
            <span>{items.length}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>N° Movimiento:</p>
            <span>{movimientoId}</span>
          </div>
        </Card>

        <Card className='flex flex-col dark:text-white'>
          <div className='flex justify-between'>
            <p className='font-semibold'>B. Origen: </p>
            <span>{bodegaOrigen.nombre}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'># Suc. Origen:</p>
            <span>{bodegaOrigen.sucursal}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'>B. Destino: </p>
            <span>{bodegaDestino.nombre}</span>
          </div>
          <div className='flex justify-between'>
            <p className='font-semibold'># Suc. Destino:</p>
            <span>{bodegaDestino.sucursal}</span>
          </div>
        </Card>

        <Card className='flex flex-col gap-2 dark:text-white'>
          <p className='font-semibold'>Descripción</p>
          <div className='flex justify-between'>{descripcion}</div>
        </Card>

      </section>

    </article>
  )
}
