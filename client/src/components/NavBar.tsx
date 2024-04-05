import { useOutsideClick } from '../hooks/useOutsideClick'
import { Articulos, Bodegas, Simcards } from './NavLinks'
import { ButtonDow, CloseIcon, HomeIcon } from './icons'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../Auth/AuthContext'
import { LogoGane, NavItem } from './ui'
import { useState, useRef } from 'react'
import { Switch } from '@tremor/react'

export function NavBar (): JSX.Element {
  const { toggleTheme } = useTheme()
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()
  const rol = user?.rol

  useOutsideClick(navRef, () => { setActiveComponent(null) })

  const handleClick = (id: string): void => {
    setActiveComponent(prevId => prevId === id ? null : id)
  }

  return (
    <nav className="flex py-2 bg-slate-200 dark:bg-slate-950 justify-around dark:text-white" ref={navRef}>

      <LogoGane />

      <ul className="flex items-center gap-4">

        <NavItem to="/home" title="Inicio / Home">
          <HomeIcon />
        </NavItem>

        <NavItem to="/movimientos" title="Movimientos">
          <p className='font-semibold'>Movimientos</p>
        </NavItem>

        {/* TODO:  Menu Despegable de Arículos */}
        <li className="relative z-50">
          <button id='Articulos' className="flex font-semibold  items-center hover:text-blue-600" onClick={() => { handleClick('Articulos') }} >
            <span>Artículos</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Articulos' && <Articulos rol={rol} close={setActiveComponent}/>}

        </li>

        {/* TODO:  Menu Despegable de Bodegas */}
        <li className="relative z-50">
          <button id='Bodegas' className="flex font-semibold  items-center hover:text-blue-600" onClick={() => { handleClick('Bodegas') }} >
            <span>Bodegas</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Bodegas' && <Bodegas rol={rol} close={setActiveComponent} />}

        </li>

        {/* TODO:  Menu Despegable de Simcards */}
        <li className="relative z-50">
          <button id='Simcards' className="flex font-semibold  items-center hover:text-blue-600" onClick={() => { handleClick('Simcards') }} >
            <span>Simcards</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Simcards' && <Simcards rol={rol} close={setActiveComponent}/>}

        </li>

        <li className="pt-1 cursor-pointer" onClick={logout} title="Cerrar Sesion">
          <CloseIcon />
        </li>

        <li className='flex rounded-md p-2 h-7 w-16 bg-dark-tremor-brand-muted'>
          <Switch onChange={toggleTheme} />
        </li>
      </ul>

    </nav>
  )
}
