import { NavLink } from 'react-router-dom'
import { SuccesIcon, LockIcon, ButtonDow } from '../../icons'

export function Articulos ({ handleClickMenu, renderMenu, handleLinkClick, authorize }) {
  return (
    <li className='relative flex justify-center menu'>
      <button id='Articulos' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={handleClickMenu}>
        Artículos
        <ButtonDow />
      </button>
      {
        renderMenu.id === 'Articulos' && renderMenu.render === true && (
          <article className="absolute -left-16 top-11 w-52">
            <ul className=' bg-gray-900 py-2 rounded-b-lg'>
              <li className='flex flex-col items-center w-full gap-2'>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/items"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Ver Items
                  <figure className=' text-green-600 rounded-full'>
                    <SuccesIcon />
                  </figure>
                </NavLink>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/items/crearItems"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Crear Items
                  {
                    authorize === 'Administrador' || authorize === 'Aux administrativo'
                      ? <figure className='text-green-500 rounded-full'><SuccesIcon /></figure>
                      : <figure className='text-red-500 rounded-full'><LockIcon /></figure>
                  }
                </NavLink>
                <NavLink onClick={handleLinkClick} to="/bodega/stock/items/asignarItems"
                  className="text-white hover:text-blue-400 font-semibold py-2 flex justify-between w-full px-6 hover:bg-slate-700">
                  Asginar Items
                  {
                    authorize === 'Administrador' || authorize === 'Aux administrativo'
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
