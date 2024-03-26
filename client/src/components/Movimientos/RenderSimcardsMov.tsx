import { type Movimiento } from '../../types/Movimiento'

export function RenderSimcardMov ({ simcards }: { simcards: Movimiento['simcards'] }): JSX.Element {
  return (
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
}
