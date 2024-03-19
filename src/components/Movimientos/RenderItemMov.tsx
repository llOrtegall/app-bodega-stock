import { type Movimiento } from '../../types/Movimiento'

export function RenderItemsMov ({ items }: { items: Movimiento['items'] }): JSX.Element {
  return (
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
              : <tr><td colSpan={5} className='text-center'>No Se Realizaron Movimientos De Items</td></tr>
          }
        </tbody>
      </table>
    </article>
  )
}
