import { getDetailBodegaById } from '../../services/Bodegas.services'
import { type BodegaIntIS } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function DetalleBodega (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa
  const { id } = useParams()

  const [bodega, setBodega] = useState<BodegaIntIS>()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandedSim, setIsExpandedSim] = useState(false)

  const handleToggle = (): void => {
    setIsExpanded(!isExpanded)
  }

  const handleToggleSim = (): void => {
    setIsExpandedSim(!isExpandedSim)
  }

  useEffect(() => {
    if (id === undefined) return
    void getDetailBodegaById({ company, id })
      .then(data => { setBodega(data) })
  }, [id, company])

  return (
    <main>
      {
        (bodega != null) && (
          <section >
            <h1 className='text-center p-2 bg-slate-700 text-white text-lg'>Detalle Bodega Con UUID: <span className='uppercase font-semibold'>{bodega._id}</span></h1>
            <article className='bg-blue-200 grid grid-cols-2 place-items-center py-4 px-4'>
              <p className='w-[500px]'><span className='text-blue-700 font-bold'>Nombre:</span> <span className='font-semibold'>{bodega.nombre}</span></p>

              <p className='w-[500px]'><span className='text-blue-700 font-bold'>Dirección:</span> <span className='font-semibold'>{bodega.direccion}</span></p>
              {
                Array.isArray(bodega?.items) && bodega.items.length !== 0
                  ? (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Items Asignados:</span> <span className='font-semibold'>{bodega.items.length}</span></p>)
                  : (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Items Asignados:</span> <span className='font-semibold'>0</span></p>)
              }
              <p className='w-[500px]'><span className='text-blue-700 font-bold'>Sucursal: </span><span className='font-semibold'>{bodega.sucursal}</span></p>
              {
                Array.isArray(bodega?.simcards) && bodega.simcards.length !== 0
                  ? (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Sims Asignadas:</span> <span className='font-semibold'>{bodega.simcards.length}</span></p>)
                  : (<p className='w-[500px]'><span className='text-blue-700 font-bold'>N° Sims Asignadas:</span>  <span className='font-semibold'>0</span></p>)
              }
            </article>
          </section>
        )
      }

      <div className='flex px-2 gap-2'>
        {/* // TODO: Renderizado De Items Si Existen */}
        <section className='w-1/2' >
          <h3 onClick={handleToggle} className='text-center hover:underline py-2 items-center cursor-pointer'>
            <span>{isExpanded ? '▲' : '▼'}</span> Ver Detalles Items
          </h3>
          {isExpanded && (bodega != null) && (
            <>
              <article className="flex justify-around text-center bg-blue-400 shadow-lg py-2 mb-2 text-sm">
                <p className="font-semibold">Items</p>
                <p className="font-semibold">Descripción</p>
                <p className="font-semibold">Serial</p>
                <p className="font-semibold">Placa</p>
                <p className="font-semibold">Estado</p>
              </article>
              <article>
                {
                  Array.isArray(bodega.items) && bodega.items.length !== 0
                    ? (bodega.items.map(item => (
                        typeof item !== 'string' && (
                        <article key={item._id} className="grid grid-cols-5 rounded-md bg-slate-100 uppercase text-sm py-2 my-2 text-center shadow-lg">
                          <p className="font-semibold">{item.nombre}</p>
                          <p className="text-gray-500">{item.descripcion}</p>
                          <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
                          <p className="text-gray-500">{item.placa}</p>
                          <p className="text-gray-500">{item.estado}</p>
                        </article>
                        )
                      )))
                    : (<p className='text-center text-2xl font-semibold'>No Existen Items Asignados</p>)
                }
              </article>
            </>
          )}
        </section>

        {/* // TODO: Renderizado De Simcards Si Existen */}
        <section className='w-1/2'>
          <h3 onClick={handleToggleSim} className='text-center hover:underline py-2 items-center cursor-pointer'>
            <span>{isExpandedSim ? '▲' : '▼'}</span> Ver Detalles Simcards
          </h3>

          {
            isExpandedSim && (<>
              <article className="grid grid-cols-7 text-center bg-blue-400 shadow-lg py-2 mb-2 text-sm">
                <p className="font-semibold">Número</p>
                <p className="font-semibold">Operador</p>
                <p className="font-semibold">Estado</p>
                <p className="font-semibold">Serial</p>
                <p className="font-semibold">APN</p>
                <p className="font-semibold">User</p>
                <p className="font-semibold">Pass</p>
              </article>

              <article className=''>
                {
                  (bodega != null) && Array.isArray(bodega.simcards) && bodega.simcards.length !== 0
                    ? (bodega.simcards.map(item => (
                        typeof item !== 'string' && (
                        <article key={item._id} className="grid grid-cols-7 rounded-md bg-slate-100 uppercase text-sm py-2 my-2 text-center shadow-lg">
                          <p className="font-semibold">{item.numero}</p>
                          <p className="text-gray-500">{item.operador}</p>
                          <p className="text-gray-500">{item.estado}</p>
                          <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
                          <p className="text-gray-500">{item.apn}</p>
                          <p className="text-gray-500">{item.user}</p>
                          <p className="text-gray-500">{item.pass}</p>
                        </article>
                        )
                      )))
                    : (<p className='text-center text-2xl font-semibold'>No Existen Simcards Asignadas</p>)
                }
              </article>
            </>
            )
          }
        </section>
      </div>
    </main>
  )
}
