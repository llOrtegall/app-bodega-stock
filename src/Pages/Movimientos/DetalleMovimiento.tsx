import { useAuth } from '../../Auth/AuthContext.js'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export function DesatalleMovimiento () {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const { id } = useParams()
  
  const [movimiento, setMovimiento] = useState(null)

  useEffect(() => {
    axios.get(`/movimiento/${company}/${id}`)
      .then(res => {
        setMovimiento(res.data)
      })
      .catch(err => console.log(err))
  }, [id])

  if (!movimiento) {
    return <div>Loading...</div>
  }

  const { simcards, bodegaDestino, bodegaOrigen, encargado, fecha, incidente, movimientoId, items, descripcion } = movimiento

  return (

    movimiento &&
    <main className='flex flex-col gap-4 h-[93vh]'>
      <article className='bg-slate-400'>
        <section className='black'>
          <h1 className="text-lg text-center text-white bg-blue-600 p-2 font-semibold uppercase">Información Del Movimiento</h1>
        </section>

        <section className='flex justify-around py-2'>
          <article className='flex gap-4 items-center'>
            <div className=''>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>N° Incidente: </span><span className='text-sm text-black font-normal'>{incidente}</span></p>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>Encargado:</span> <span className='text-sm text-black font-normal'>{encargado}</span></p>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>Fecha: </span><span className='text-sm text-black font-normal'>{fecha}</span></p>
            </div>
            <div className=''>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>Cantidad De Simcards Movidas:</span> <span className='text-sm text-black font-normal'>{simcards.entran.length + simcards.salen.length}</span> </p>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>Cantidad De Items Movidos:</span> <span className='text-sm text-black font-normal'>{items.length}</span> </p>
              <p className='text-md font-semibold flex items-center justify-between gap-4'><span>N° Movimiento:</span> <span className='text-sm text-black font-normal'>{movimientoId}</span></p>
            </div>
          </article>
          <article className=''>
            <p className='flex items-center gap-4 justify-between'><span className='font-semibold'>Bodega De Origen: </span><span className='text-sm text-black font-normal'>{bodegaOrigen.nombre}</span></p>
            <p className='flex items-center gap-4 justify-between'><span className='font-semibold'>Bodega De Destino:</span> <span className='text-sm text-black font-normal'>{bodegaDestino.nombre}</span> </p>
            <div className='flex justify-between gap-4 items-center'>
              <p><span className='font-semibold'>N° Sucursal Origen:</span> <span className='text-sm text-black font-normal'>{bodegaOrigen.sucursal}</span> </p>
              <p><span className='font-semibold'>N° Sucursal Destino: </span><span className='text-sm text-black font-normal'>{bodegaDestino.sucursal}</span> </p>
            </div>
          </article>
          <article className='flex flex-col items-center'>
            <h3 className='font-semibold'>Descripción</h3>
            <p className='text-black'>{descripcion}</p>
          </article>
        </section>
      </article>

      {
        items.length > 0
          ? (
            <article className='w-full flex flex-col gap-2 '>
              <table className="table-auto w-full bg-slate-200">
                <thead >
                  <tr className=''>
                    <th className="bg-blue-600 py-1">Item</th>
                    <th className="bg-blue-600 py-1">Descripción</th>
                    <th className='bg-blue-600 py-1'>N° Placa</th>
                    <th className="bg-blue-600 py-1">Serial</th>
                    <th className="bg-blue-600 py-1">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    items.length > 0
                      ? items.map(item => (
                        <tr key={item._id}>
                          <td className="text-center">{item.nombre}</td>
                          <td className="text-center">{item.descripcion}</td>
                          <td className='uppercase text-center'>{item.placa}</td>
                          <td className='uppercase text-center'>{item.serial}</td>
                          <td className="text-center">1</td>
                        </tr>
                      ))
                      : <tr><td colSpan='5' className='text-center'>No Se Realizaron Movimientos De Items</td></tr>
                  }
                </tbody>
              </table>
            </article>
            )
          : null
      }

      {
        simcards.entran.length > 0
          ? (
            <article className='w-full flex flex-col gap-2 bg-slate-200'>
              <table className="table-auto w-full ">
                <thead>
                  <tr>
                    <th className="py-1 bg-blue-600">N°</th>
                    <th className="py-1 bg-blue-600">Número</th>
                    <th className="py-1 bg-blue-600">Operador</th>
                    <th className="py-1 bg-blue-600">Serial</th>
                    <th className="py-1 bg-blue-600">Estado</th>
                    <th className="py-1 bg-blue-600">Movimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    simcards.entran.length > 0
                      ? simcards.entran.map((sim, index) => (
                        <tr key={sim._id} className='bg-green-200'>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{sim.numero}</td>
                          <td className="text-center">{sim.operador}</td>
                          <td className='text-center'>{sim.estado}</td>
                          <td className='uppercase text-center'>{sim.serial}</td>
                          <td className='text-center'>Entrada</td>
                        </tr>
                      ))
                      : <div className='text-center'>No Se Realizaron Entradas De Simcards</div>
                  }

                  {
                    simcards.salen.length > 0
                      ? simcards.salen.map((sim, index) => (
                        <tr key={sim._id} className='bg-red-200'>
                          <td className="text-center">{index + 1}</td>
                          <td className="text-center">{sim.numero}</td>
                          <td className="text-center">{sim.operador}</td>
                          <td className='text-center'>{sim.estado}</td>
                          <td className='uppercase text-center'>{sim.serial}</td>
                          <td className='text-center'>Salida</td>
                        </tr>))
                      : <div className='text-center'>No Se Realizaron Salida De Simcards</div>
                  }
                </tbody>
              </table>
            </article>
            )
          : null
      }

    </main>

  )
}
