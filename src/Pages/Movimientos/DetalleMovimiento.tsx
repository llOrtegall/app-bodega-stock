import { RenderDetailMov } from '../../components/Movimientos/RenderDetail.js'
import { getMovimiento } from '../../services/Mov.services.js'
import { Movimiento } from '../../interfaces/MovInterfaces.js'
import { Loading } from '../../components/ui/Loadin.js'
import { useAuth } from '../../Auth/AuthContext.js'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function DesatalleMovimiento () {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const { id } = useParams()
  const [movimiento, setMovimiento] = useState<Movimiento>()

  useEffect(() => {
    getMovimiento(company, id || '')
      .then(res => setMovimiento(res))
      .catch(err => console.log(err))
  }, [id, company])

  if (!movimiento) {
    return <Loading />
  }

  return (
    <main className='flex flex-col gap-4 h-[93vh]'>

      <RenderDetailMov mov={movimiento}/>

      {
        movimiento.items.length > 0
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
                    movimiento.items.length > 0
                      ? movimiento.items.map(item => (
                        <tr key={item._id}>
                          <td className="text-center">{item.nombre}</td>
                          <td className="text-center">{item.descripcion}</td>
                          <td className='uppercase text-center'>{item.placa}</td>
                          <td className='uppercase text-center'>{item.serial}</td>
                          <td className="text-center">1</td>
                        </tr>
                      ))
                      : <tr><td colSpan={5}className='text-center'>No Se Realizaron Movimientos De Items</td></tr>
                  }
                </tbody>
              </table>
            </article>
            )
          : null
      }

      {
        movimiento.simcards.entran.length > 0
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
                    movimiento.simcards.entran.length > 0
                      ? movimiento.simcards.entran.map((sim, index) => (
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
                    movimiento.simcards.salen.length > 0
                      ? movimiento.simcards.salen.map((sim, index) => (
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
