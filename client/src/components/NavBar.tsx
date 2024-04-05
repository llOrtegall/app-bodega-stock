import { Articulos, Bodegas, Simcards } from './NavLinks/LinksComponents'
import { useOutsideClick } from '../hooks/useOutsideClick'
import ButtonActiComp from './NavLinks/ButtonLinkComp'
import { useTheme } from '../contexts/ThemeContext'
import { CloseIcon, HomeIcon } from './icons'
import { useAuth } from '../Auth/AuthContext'
import { Image } from './icons/Image'
import { useState, useRef } from 'react'
import { Switch } from '@tremor/react'
import { NavItem } from './ui'

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
    <nav className="flex py-2 xl:py-3 2xl:py-4 bg-slate-100 dark:bg-slate-950 justify-around dark:text-white border-b-2 border-slate-400" ref={navRef}>

      <Image src="/gane.webp" alt="Foto Gane" className='w-20 xl:w-24 1xl:w-28 3xl:w-32'/>

      <section className="flex items-center gap-4">

        <NavItem to="/home" title="Inicio / Home">
          <figure className='text-sm xl:text-base 1xl:text-lg 2xl:text-xl 3xl:text-2xl'>
            <HomeIcon />
          </figure>
        </NavItem>

        <NavItem to="/movimientos" title="Movimientos" >
          <p className='font-semibold text-sm xl:text-base 1xl:text-lg 2xl:text-xl 3xl:text-2xl'>Movimientos</p>
        </NavItem>

        <article className="relative z-30">
          <ButtonActiComp id='Articulos' handleClick={handleClick} />
          {activeComponent === 'Articulos' && <Articulos rol={user.rol} close={setActiveComponent} />}
        </article>

        <article className="relative z-30">
          <ButtonActiComp id='Bodegas' handleClick={handleClick} />
          {activeComponent === 'Bodegas' && <Bodegas rol={user.rol} close={setActiveComponent} />}
        </article>

        <article className="relative z-30">
          <ButtonActiComp id='Simcards' handleClick={handleClick} />
          {activeComponent === 'Simcards' && <Simcards rol={user.rol} close={setActiveComponent} />}
        </article>

        <article className="pt-1 cursor-pointer" onClick={logout} title="Cerrar Sesion">
          <CloseIcon />
        </article>

        <article className='flex rounded-md p-2 h-7 w-16 dark:bg-slate-500'>
          <Switch onChange={toggleTheme} />
        </article>
      </section>

    </nav>
  )
}
