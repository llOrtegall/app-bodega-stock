import { type Movimiento } from '../../types/Movimiento'

export function RenderItemsMov({ items }: { items: Movimiento['items'] }): JSX.Element {
  return (
    <article className='w-full flex flex-col gap-2 '>
      <table className="table-auto w-full bg-slate-200">
        <thead >
          <tr className=' bg-blue-300 dark:bg-blue-950'>
            <th className='py-2 dark:text-white'>Item</th>
            <th className='py-2 dark:text-white'>Descripción</th>
            <th className='py-2 dark:text-white'>N° Placa</th>
            <th className='py-2 dark:text-white'>Serial</th>
            <th className='py-2 dark:text-white'>Cantidad</th>
            <th className='py-2 dark:text-white'>Movimiento</th>
          </tr>
        </thead>
        <tbody>
        {
            items.entran.length > 0
              ? items.entran.map((item, index) => (
                <tr key={item._id} className='bg-green-200'>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.nombre}</td>
                  <td className="text-center">{item.placa}</td>
                  <td className='text-center'>{item.estado}</td>
                  <td className='uppercase text-center'>{item.serial}</td>
                  <td className='text-center'>Entrada</td>
                </tr>
              ))
              : <div className='text-center'>No Se Realizaron Entradas De items</div>
          }

          {
            items.salen.length > 0
              ? items.salen.map((item, index) => (
                <tr key={item._id} className='bg-red-200'>
                  <td className="text-center">{index + 1}</td>
                  <td className="text-center">{item.nombre}</td>
                  <td className="text-center">{item.placa}</td>
                  <td className='text-center'>{item.estado}</td>
                  <td className='uppercase text-center'>{item.serial}</td>
                  <td className='text-center'>Salida</td>
                </tr>))
              : <div className='text-center'>No Se Realizaron Salida De items</div>
          }
        </tbody>
      </table>
    </article>
  )
}


