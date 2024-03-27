import { LockIcon, SuccesIcon } from '../icons'
import { NavLink } from 'react-router-dom'

interface BodegasProps {
  rol: string | undefined;
  close: (value: string | null) => void;
}


export function Bodegas({rol, close}: BodegasProps) {
  return (
    <article className="absolute -left-16 top-11 w-64">
      <ul className=' bg-slate-200 py-2 rounded-b-lg dark:bg-slate-950 justify-around dark:text-white'>
        <li className='flex flex-col items-center w-full gap-2'>
          <NavLink to="/bodega/verBodegas" onClick={() => close(null)}
            className=" hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
            Ver Bodegas
            <figure className='text-green-500 rounded-full'>
              <SuccesIcon />
            </figure>
          </NavLink>
          <NavLink to="/bodega/crearBodega" onClick={() => close(null)}
            className=" hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
            Crear Bodega
            {
              rol === 'Coordinador Soporte' || rol === 'Aux administrativo' || rol === 'Administrador'
                ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
            }
          </NavLink>
          <NavLink to="/bodega/crearMovimiento" onClick={() => close(null)}
            className=" hover:text-blue-600 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-300">
            Crear Movimiento
            {
              rol === 'Coordinador Soporte' || rol === 'Aux administrativo' || rol === 'Administrador'
                ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
            }
          </NavLink>
        </li>
      </ul>
    </article>
  )
}
