import { Movimiento } from "../../types/MovInterfaces";
import { formatFecha } from "../../utils/FormaFecha";

export function RenderDetailMov({ mov }: { mov: Movimiento }) {
  const { bodegaOrigen, bodegaDestino, descripcion, encargado, fecha, incidente, items, movimientoId, simcards } = mov

  return (
    <article className='bg-slate-400'>
      <section className='black'>
        <h1 className="text-lg text-center text-white bg-blue-600 p-2 font-semibold uppercase">Información Del Movimiento</h1>
      </section>

      <section className='flex justify-around py-2'>
        <article className='flex gap-4 items-center'>
          <div className=''>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>N° Incidente: </span><span className='text-sm text-black font-normal'>{incidente}</span>
            </p>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>Encargado:</span> <span className='text-sm text-black font-normal'>{encargado}</span>
            </p>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>Fecha y Hora: </span><span className='text-sm text-black font-normal'>{formatFecha(fecha)}</span>
            </p>
          </div>
          <div className=''>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>Cantidad De Simcards Movidas:</span> <span className='text-sm text-black font-normal'>{simcards.entran.length + simcards.salen.length}</span>
            </p>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>Cantidad De Items Movidos:</span> <span className='text-sm text-black font-normal'>{items.length}</span>
            </p>
            <p className='text-md font-semibold flex items-center justify-between gap-4'>
              <span>N° Movimiento:</span> <span className='text-sm text-black font-normal'>{movimientoId}</span>
            </p>
          </div>
        </article>
        <article className=''>
          <p className='flex items-center gap-4 justify-between'>
            <span className='font-semibold'>Bodega De Origen: </span><span className='text-sm text-black font-normal'>{bodegaOrigen.nombre}</span>
          </p>
          <p className='flex items-center gap-4 justify-between'>
            <span className='font-semibold'>Bodega De Destino:</span> <span className='text-sm text-black font-normal'>{bodegaDestino.nombre}</span>
          </p>
          <div className='flex justify-between gap-4 items-center'>
            <p>
              <span className='font-semibold'>N° Sucursal Origen:</span> <span className='text-sm text-black font-normal'>{bodegaOrigen.sucursal}</span>
            </p>
            <p>
              <span className='font-semibold'>N° Sucursal Destino: </span><span className='text-sm text-black font-normal'>{bodegaDestino.sucursal}</span>
            </p>
          </div>
        </article>
        <article className='flex flex-col items-center'>
          <h3 className='font-semibold'>Descripción</h3>
          <p className='text-black'>{descripcion}</p>
        </article>
      </section>
    </article>
  )
}