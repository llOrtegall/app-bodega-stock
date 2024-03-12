import { NavLink } from 'react-router-dom'
import { ButtonDow, LockIcon, SuccesIcon } from '../../icons'

export function Simcards ({ handleClickMenu, renderMenu, handleLinkClick, authorize }) {
  return (
    <li className='relative flex justify-center menu'>
    <button id='Simcards' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
      Simcards
      <ButtonDow />
    </button>
    {
      renderMenu.id === 'Simcards' && renderMenu.render === true && (
        <article className="absolute -left-18 top-11 w-56">
          <ul className=' bg-gray-900 py-2 rounded-b-lg'>
            <li className='flex flex-col items-center w-full gap-2'>
              <NavLink onClick={handleLinkClick} to="/bodega/stock/verSimcards"
                className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                Ver Simcards
                <figure className='text-green-500 rounded-full'>
                  <SuccesIcon />
                </figure>
              </NavLink>
              <NavLink onClick={handleLinkClick} to="/bodega/stock/simcards/crearSimcard"
                className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                Crear Simcards
                {
                  authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                    ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                    : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                }
              </NavLink>
              <NavLink onClick={handleLinkClick} to="/bodega/stock/simcards/asignarSimcards"
                className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                Asignar Simcards
                {
                  authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                    ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                    : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                }
              </NavLink>
              <NavLink onClick={handleLinkClick} to="/bodega/stock/simcards/crearMovimientoSimcard"
                className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                Crear Mov Sims
                {
                  authorize === 'Coordinador Soporte' || authorize === 'Administrador'
                    ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                    : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                }
              </NavLink>
            </li>
          </ul>
        </article>
      )
    }
  </li>
  )
}
