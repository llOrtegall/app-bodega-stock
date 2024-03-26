import { Articulos, Bodegas, Simcards } from './NavLinks'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { ButtonDow, CloseIcon, HomeIcon } from './icons'
import { useAuth } from '../Auth/AuthContext'
import { useState, useRef } from 'react'
import { LogoGane, NavItem } from './ui'
import { useTheme } from '../contexts/ThemeContext'
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
    <nav className="flex p-3 bg-slate-900 justify-around" ref={navRef}>

      <LogoGane />

      <ul className="flex items-center gap-4 text-white text-xl">

        <NavItem to="/home" title="Inicio / Home">
          <HomeIcon />
        </NavItem>

        <NavItem to="/movimientos" title="Movimientos">
          Movimientos
        </NavItem>

        {/* TODO:  Menu Despegable de Arículos */}
        <li className="relative">
          <button id='Articulos' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => { handleClick('Articulos') }} >
            <span>Artículos</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Articulos' && <Articulos rol={rol} close={setActiveComponent}/>}

        </li>

        {/* TODO:  Menu Despegable de Bodegas */}
        <li className="relative">
          <button id='Bodegas' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => { handleClick('Bodegas') }} >
            <span>Bodegas</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Bodegas' && <Bodegas rol={rol} close={setActiveComponent} />}

        </li>

        {/* TODO:  Menu Despegable de Simcards */}
        <li className="relative">
          <button id='Simcards' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => { handleClick('Simcards') }} >
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

        <li className='pt-2 pl-6'>
          <Switch onChange={toggleTheme} />
        </li>
      </ul>
    </nav>
  )
}
