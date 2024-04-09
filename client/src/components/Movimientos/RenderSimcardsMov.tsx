import { type Movimiento } from '../../types/Movimiento'

export function RenderSimcardMov({ simcards, bodOri, bodDes }: { simcards: Movimiento['simcards'], bodOri: Movimiento['bodegaOrigen'], bodDes: Movimiento['bodegaDestino'] }): JSX.Element {
  return (
    <article className='w-full flex flex-col gap-2 bg-slate-200'>

      <div>
        <p className='text-center py-2 bg-yellow-100'>
          <span className='font-semibold'>Origen: </span> {bodOri.nombre} ➡️ <span className='font-semibold'>Destino: </span>
          {bodDes.nombre}
        </p>
        <table className="table-auto w-full ">
          <thead>
            <tr>
              <th className="py-1 bg-blue-600">Número</th>
              <th className="py-1 bg-blue-600">Operador</th>
              <th className="py-1 bg-blue-600">Serial</th>
              <th className="py-1 bg-blue-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            {
              simcards.entran.length > 0
                ? simcards.entran.map((sim) => (
                  <tr key={sim._id} className='bg-green-200'>
                    <td className="text-center">{sim.numero}</td>
                    <td className="text-center">{sim.operador}</td>
                    <td className='text-center'>{sim.estado}</td>
                    <td className='uppercase text-center'>{sim.serial}</td>
                  </tr>
                ))
                : <div className='text-center'>No Se Realizaron Entradas De Simcards</div>
            }

          </tbody>
        </table>
      </div>

      {
        simcards.salen.length > 0 ? (

          <div>
            <p className='text-center py-2 bg-yellow-100'>
              <span className='font-semibold'>Origen: </span> {bodDes.nombre} ➡️ <span className='font-semibold'>Destino: </span>
              {bodOri.nombre}
            </p>
            <table className="table-auto w-full ">
              <thead>
                <tr>
                  <th className="py-1 bg-blue-600">Número</th>
                  <th className="py-1 bg-blue-600">Operador</th>
                  <th className="py-1 bg-blue-600">Serial</th>
                  <th className="py-1 bg-blue-600">Estado</th>
                </tr>
              </thead>
              <tbody>
                {
                  simcards.salen.map((sim) => (
                    <tr key={sim._id} className='bg-red-200'>
                      <td className="text-center">{sim.numero}</td>
                      <td className="text-center">{sim.operador}</td>
                      <td className='text-center'>{sim.estado}</td>
                      <td className='uppercase text-center'>{sim.serial}</td>
                    </tr>))
                }
              </tbody>
            </table>
          </div>
        ) : <div className='text-center'>No Se Realizaron Salida De Simcards</div>

      }
    </article>
  )
}

