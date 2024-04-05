import { Articulos, Bodegas, Simcards } from './NavLinks/LinksComponents'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { ButtonDow, CloseIcon, HomeIcon } from './icons'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../Auth/AuthContext'
import { LogoGane, NavItem } from './ui'
import { useState, useRef } from 'react'
import { Switch } from '@tremor/react'

export function NavBar(): JSX.Element {
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const { toggleTheme } = useTheme()
  const navRef = useRef<HTMLDivElement>(null)
  const { user, logout } = useAuth()

  useOutsideClick(navRef, () => { setActiveComponent(null) })

  const handleClick = (id: string): void => {
    setActiveComponent(prevId => prevId === id ? null : id)
  }

  return (
    <nav className="flex py-2 bg-slate-200 dark:bg-slate-950 justify-around dark:text-white" ref={navRef}>

      <LogoGane />

      <section className="flex items-center gap-4">

        <NavItem to="/home" title="Inicio / Home">
          <HomeIcon />
        </NavItem>

        <NavItem to="/movimientos" title="Movimientos">
          <p className='font-semibold'>Movimientos</p>
        </NavItem>

        {/* TODO:  Menu Despegable de Arículos */}
        <article className="relative z-50">
          <button id='Articulos' className="flex font-semibold  items-center hover:text-blue-600"
            onClick={() => { handleClick('Articulos') }} >
            <span>Artículos</span>
            <figure className="flex items-center pt-1"><ButtonDow /></figure>
          </button>

          {activeComponent === 'Articulos' && <Articulos rol={user.rol} close={setActiveComponent} />}

        </article>

        {/* TODO:  Menu Despegable de Bodegas */}
        <article className="relative z-50">
          <button id='Bodegas' className="flex font-semibold  items-center hover:text-blue-600"
            onClick={() => { handleClick('Bodegas') }} >
            <span>Bodegas</span>
            <figure className="flex items-center pt-1"><ButtonDow /></figure>
          </button>

          {activeComponent === 'Bodegas' && <Bodegas rol={user.rol} close={setActiveComponent} />}

        </article>

        {/* TODO:  Menu Despegable de Simcards */}
        <article className="relative z-50">
          <button id='Simcards' className="flex font-semibold  items-center hover:text-blue-600"
            onClick={() => { handleClick('Simcards') }} >
            <span>Simcards</span>
            <figure className="flex items-center pt-1"><ButtonDow /></figure>
          </button>

          {activeComponent === 'Simcards' && <Simcards rol={user.rol} close={setActiveComponent} />}

        </article>

        <article className="pt-1 cursor-pointer" onClick={logout} title="Cerrar Sesion">
          <CloseIcon />
        </article>

        <article className='flex rounded-md p-2 h-7 w-16 bg-dark-tremor-brand-muted'>
          <Switch onChange={toggleTheme} />
        </article>
      </section>

    </nav>
  )
}
