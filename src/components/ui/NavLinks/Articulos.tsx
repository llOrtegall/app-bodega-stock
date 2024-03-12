import { NavLink } from 'react-router-dom'
import { SuccesIcon, LockIcon } from '../../icons'

interface ArticulosProps {
  rol: string | undefined;
}


export function Articulos({ rol }: ArticulosProps) {
  return (
      <article className="absolute -left-16 top-11 w-52">
        <ul className=' bg-gray-900 py-2 rounded-b-lg'>
          <li className='flex flex-col items-center w-full gap-2'>
            <NavLink to="/bodega/stock/items"
              className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
              Ver Items
              <figure className=' text-green-600 rounded-full'>
                <SuccesIcon />
              </figure>
            </NavLink>
            <NavLink to="/bodega/stock/items/crearItems"
              className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
              Crear Items
              {
                rol === 'Administrador' || rol === 'Aux administrativo'
                  ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                  : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
              }
            </NavLink>
            <NavLink to="/bodega/stock/items/asignarItems"
              className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
              Asginar Items
              {
                rol === 'Administrador' || rol === 'Aux administrativo'
                  ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                  : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
              }
            </NavLink>
          </li>
        </ul>
      </article>
  )
}
