import { useNavigate } from 'react-router-dom'
import { type ItemsArray } from '../../types/Item'
import { LockIcon } from '../icons'
import { Button } from '../ui'

interface RenderItemsProps {
  items: ItemsArray
  rol: string | undefined
}

export const RenderItems = ({ items, rol }: RenderItemsProps): JSX.Element => {
  const navigate = useNavigate()

  return (
    <section>
      <article className='grid grid-cols-12 px-2 py-2 bg-blue-200 font-semibold text-center'>
        <p className="col-span-2">Items</p>
        <p className="col-span-2">Descripción</p>
        <p className="col-span-2">Serial</p>
        <p className="col-span-1">Placa</p>
        <p className="col-span-1">Estado</p>
        <p className="col-span-2">Ubicación</p>
        <p className="col-span-1">Sucursal</p>
        <p className="col-span-1">Acciones</p>
      </article>
      <article className='dark:text-white'>
        {items.map(item => (
          <article key={item._id}
            className='grid grid-cols-12 gap-2 px-2 text-center my-1 border dark:border-dark-tremor-brand-inverted place-items-center py-1 uppercase'>
            <p className="col-span-2 font-semibold">{item.nombre}</p>
            <p className="col-span-2">{item.descripcion}</p>
            <p className="col-span-2">{item.serial}</p>
            <p className="col-span-1 font-semibold">{item.placa}</p>
            <p className="col-span-1">{item.estado}</p>
            {typeof item.bodega !== 'string'
              ? <>
                <p className="col-span-2">{item.bodega?.nombre}</p>
                <p className="col-span-1">{item.bodega?.sucursal}</p>
              </>
              : <>
                <p className="col-span-2">{'No Asignado'}</p>
                <p className="col-span-1">{'No Asignado'}</p>
              </>
            }
            {
              rol === 'Administrador' || rol === 'Aux Administrativa'
                ? <Button onClick={() => { navigate(`/items/verItem/${item._id}`, { state: { id: item._id } }) }} >Editar</Button>
                : <figure className='text-red-500'><LockIcon /></figure>
            }
          </article>
        ))
        }
      </article>
    </section>

  )
}
