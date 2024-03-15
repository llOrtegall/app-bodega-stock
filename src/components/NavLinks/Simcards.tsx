import { NavLink } from 'react-router-dom'
import { LockIcon, SuccesIcon } from '../icons'

interface SimcardsProps {
  rol: string | undefined;
  close: (value: string | null) => void;
}


export function Simcards({ rol, close }: SimcardsProps) {
  return (
    <article className="absolute -left-14 top-11 w-64">
      <ul className=' bg-gray-900 py-2 rounded-b-lg'>
        <li className='flex flex-col items-center w-full gap-2'>
          <NavLink to="/simcards/verSimcards" onClick={() => close(null)}
            className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
            Ver Simcards
            <figure className='text-green-500 rounded-full'>
              <SuccesIcon />
            </figure>
          </NavLink>
          <NavLink to="/simcards/crearSimcard" onClick={() => close(null)}
            className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
            Crear Simcards
            {
              rol === 'Coordinador Soporte' || rol === 'Administrador'
                ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
            }
          </NavLink>
          <NavLink to="/simcards/asignarSimcards" onClick={() => close(null)}
            className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
            Asignar Simcards
            {
              rol === 'Coordinador Soporte' || rol === 'Administrador'
                ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
            }
          </NavLink>
          <NavLink to="/simcards/crearMovimiento" onClick={() => close(null)}
            className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
            Crear Mov Sims
            {
              rol === 'Coordinador Soporte' || rol === 'Administrador'
                ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
            }
          </NavLink>
        </li>
      </ul>
    </article>
  )
}
