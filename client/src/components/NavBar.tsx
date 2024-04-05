import { Articulos, Bodegas, Simcards } from './NavLinks/LinksComponents'
import { useOutsideClick } from '../hooks/useOutsideClick'
import ButtonActiComp from './NavLinks/ButtonLinkComp'
import { useTheme } from '../contexts/ThemeContext'
import { CloseIcon, HomeIcon } from './icons'
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

        <article className="relative z-50">
          <ButtonActiComp id='Articulos' handleClick={handleClick} />
          {activeComponent === 'Articulos' && <Articulos rol={user.rol} close={setActiveComponent} />}
        </article>

        <article className="relative z-50">
          <ButtonActiComp id='Bodegas' handleClick={handleClick} />
          {activeComponent === 'Bodegas' && <Bodegas rol={user.rol} close={setActiveComponent} />}
        </article>

        <article className="relative z-50">
          <ButtonActiComp id='Simcards' handleClick={handleClick} />
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
