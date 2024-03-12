import { useNavigate } from 'react-router-dom'
import { ItemWithBodega } from '../../interfaces/Item.Intece'
import { LockIcon } from '../icons'

interface RenderItemsProps {
  items: ItemWithBodega;
  rol: string | undefined;
}

export const RenderItems = ({ items, rol }: RenderItemsProps) => {
  const navigate = useNavigate()

  return (
    <section>
      <article className='flex justify-around text-center bg-blue-500 uppercase text-sm shadow-lg py-2'>
        <p className="font-semibold">Items</p>
        <p className="font-semibold">Descripción</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Placa</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Ubicación</p>
        <p className='font-semibold'>Sucursal</p>
        <p className="font-semibold">Acciones</p>
      </article>
      <article>
        {items.map(item => (
          <article key={item._id}
            className='grid grid-cols-8 shadow-md bg-slate-200 uppercase text-sm py-2 my-2 text-center  place-items-center'>
            <p className="font-semibold">{item.nombre}</p>
            <p className="text-gray-500">{item.descripcion}</p>
            <p className="text-gray-500">{item.serial}</p>
            <p className="text-gray-700">{item.placa}</p>
            <p className="text-gray-500">{item.estado}</p>
            {typeof item.bodega !== 'string'
              ? <>
                <p className="text-gray-500">{item.bodega?.nombre}</p>
                <p className="text-gray-500">{item.bodega?.sucursal}</p>
              </>
              : <>
                <p className="text-gray-500">{'No Asignado'}</p>
                <p className="text-gray-500">{'No Asignado'}</p>
              </>
            }
            {
              rol === 'Administrador' || rol === 'Aux Administrativa'
                ? <button onClick={() => navigate(`/bodega/stock/items/${item._id}`, { state: { id: item._id } })}
                  className='bg-green-500 w-28 p-1 rounded-md font-semibold hover:bg-green-400 hover:text-white'>Editar Item</button>
                : <figure className='text-red-500'><LockIcon /></figure>
            }
          </article>
        ))
        }
      </article>
    </section>

  )
}
