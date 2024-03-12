import { ButtonDow, LockIcon, SuccesIcon } from '../../icons'
import { NavLink } from 'react-router-dom'

export function Bodegas ({ handleClickMenu, renderMenu, handleLinkClick, authorize }) {
  return (
    <li className='relative flex justify-center menu'>
      <button id='Bodegas' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
        Bodegas
        <ButtonDow />
      </button>
      {
        renderMenu.id === 'Bodegas' && renderMenu.render === true && (
          <article className="absolute -left-16 top-11 w-52">
            <ul className=' bg-gray-900 py-2 rounded-b-lg'>
              <li className='flex flex-col items-center w-full gap-2'>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/bodega"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Ver Bodegas
                  <figure className='text-green-500 rounded-full'>
                    <SuccesIcon />
                  </figure>
                </NavLink>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/bodega/crearBodega"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Crear Bodega
                  {
                    authorize === 'Coordinador Soporte' || authorize === 'Aux administrativo' || authorize === 'Administrador'
                      ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                      : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                  }
                </NavLink>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/bodega/crearMovimiento"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Crear Movimiento
                  {
                    authorize === 'Coordinador Soporte' || authorize === 'Aux administrativo' || authorize === 'Administrador'
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
