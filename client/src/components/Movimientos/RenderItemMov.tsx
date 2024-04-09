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
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(items) ? items.map(item => (
              <tr key={item._id} className='bg-blue-100 dark:bg-blue-800 dark:text-white'>
                <td className="text-center">{item.nombre}</td>
                <td className="text-center">{item.descripcion}</td>
                <td className='uppercase text-center'>{item.placa}</td>
                <td className='uppercase text-center'>{item.serial}</td>
                <td className="text-center">1</td>
              </tr>
            )) : null
            
          }
        </tbody>
      </table>
    </article>
  )
}


{/* {items.map(item => (
  <tr key={item._id} className='bg-blue-100 dark:bg-blue-800 dark:text-white'>
    <td className="text-center">{item.nombre}</td>
    <td className="text-center">{item.descripcion}</td>
    <td className='uppercase text-center'>{item.placa}</td>
    <td className='uppercase text-center'>{item.serial}</td>
    <td className="text-center">1</td>
  </tr>
  ))
} */}