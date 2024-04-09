import { type Movimiento } from '../../types/Movimiento'

export function RenderItemsMov({ items, bodOri, bodDes }: { items: Movimiento['items'], bodOri: Movimiento['bodegaOrigen'], bodDes: Movimiento['bodegaDestino'] }): JSX.Element {
  return (
    <article className='w-full flex flex-col gap-2'>
      <div>
        <p className='text-center py-2 bg-yellow-100'>
          <span className='font-semibold'>Origen: </span> {bodOri.nombre} ➡️ <span className='font-semibold'>Destino: </span>
          {bodDes.nombre}
        </p>
        <table className="w-full">
          <thead >
            <tr className=' bg-blue-300 dark:bg-blue-950'>
              <th className='py-2 dark:text-white'>Nombre</th>
              <th className='py-2 dark:text-white'>Descripción</th>
              <th className='py-2 dark:text-white'>N° Placa</th>
              <th className='py-2 dark:text-white'>Estado</th>
              <th className='py-2 dark:text-white'>Serial</th>
            </tr>
          </thead>

          <tbody>
            {
              items.entran.length > 0
                ? items.entran.map((item) => (
                  <tr key={item._id} className='bg-green-200'>
                    <td className="text-center">{item.nombre}</td>
                    <td className="text-center">{item.descripcion}</td>
                    <td className="text-center">{item.placa}</td>
                    <td className='text-center'>{item.estado}</td>
                    <td className='uppercase text-center'>{item.serial}</td>
                  </tr>
                ))
                : <div className='text-center'>No Se Realizaron Entradas De items</div>
            }

          </tbody>
        </table>
      </div>

      <div>
        <p className='text-center py-2 bg-yellow-100'>
          <span className='font-semibold'>Origen: </span> {bodDes.nombre} ➡️ <span className='font-semibold'>Destino: </span>
          {bodOri.nombre}
        </p>
        <table className="w-full">
          <thead >
            <tr className=' bg-blue-300 dark:bg-blue-950'>
              <th className='py-2 dark:text-white'>Nombre</th>
              <th className='py-2 dark:text-white'>Descripción</th>
              <th className='py-2 dark:text-white'>N° Placa</th>
              <th className='py-2 dark:text-white'>Estado</th>
              <th className='py-2 dark:text-white'>Serial</th>
            </tr>
          </thead>

          <tbody>
            {
              items.salen.length > 0
                ? items.salen.map((item) => (
                  <tr key={item._id} className='bg-red-200'>
                    <td className="text-center">{item.nombre}</td>
                    <td className="text-center">{item.descripcion}</td>
                    <td className="text-center">{item.placa}</td>
                    <td className='text-center'>{item.estado}</td>
                    <td className='uppercase text-center'>{item.serial}</td>
                  </tr>))
                : <div className='text-center'>No Se Realizaron Salida De items</div>
            }
          </tbody>
        </table>
      </div>
    </article>
  )
}


