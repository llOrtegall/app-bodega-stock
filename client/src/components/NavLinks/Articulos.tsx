import { NavLink } from 'react-router-dom'
import { SuccesIcon, LockIcon } from '../icons'

interface ArticulosProps {
  rol: string | undefined;
  close: (value: string | null) => void;
}


export function Articulos({ rol, close }: ArticulosProps) {
  return (
      <article className="absolute -left-16 top-11 w-52 ">
        <ul className=' bg-slate-200 py-2 rounded-b-lg dark:bg-slate-950 justify-around dark:text-white'>
          <li className='flex flex-col items-center w-full gap-2'>
            <NavLink to="/items/verItems" onClick={() => {close(null)}}
              className="hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
              Ver Items
              <figure className=' text-green-600 rounded-full'>
                <SuccesIcon />
              </figure>
            </NavLink>
            <NavLink to="/items/crearItems" onClick={() => {close(null)}}
              className="hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
              Crear Items
              {
                rol === 'Administrador' || rol === 'Aux administrativo'
                  ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                  : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
              }
            </NavLink>
            <NavLink to="/items/asignarItems" onClick={() => {close(null)}}
              className="hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
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
