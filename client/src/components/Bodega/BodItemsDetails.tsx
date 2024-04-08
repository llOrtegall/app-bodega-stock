import { Item } from "../../types/Bodega"

function BodegaItemsDetail({ items }: {items: Item[]}) {
  return (
    <>
      <article className="flex justify-around text-center bg-blue-200 shadow-lg py-2 mb-2 text-sm dark:bg-blue-900 dark:text-white">
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
      </article>
      <article>
        {
          Array.isArray(items) && items.length !== 0
            ? (items.map(item => (
              typeof item !== 'string' && (
                <article key={item._id} className="grid grid-cols-5 rounded-md bg-slate-100 dark:bg-slate-600 dark:text-white uppercase text-sm py-2 my-2 text-center shadow-lg">
                  <p className="font-semibold">{item.nombre}</p>
                  <p className="text-gray-500 dark:text-white">{item.descripcion}</p>
                  <p className="text-gray-700 dark:text-white overflow-ellipsis overflow-hidden">{item.serial}</p>
                  <p className="text-gray-500 dark:text-white">{item.placa}</p>
                  <p className="text-gray-500 dark:text-white">{item.estado}</p>
                </article>
              )
            )))
            : (<p className='text-center text-2xl font-semibold'>No Existen Items Asignados</p>)
        }
      </article>
    </>
  )
}

export default BodegaItemsDetail