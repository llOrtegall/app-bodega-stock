import { useOutsideClick } from '../../hooks/useOutsideClick';
import { useAuth } from "../../Auth/AuthContext";
import { Articulos, Bodegas, Simcards } from "./NavLinks";
import { useState, useRef } from 'react';
import { ButtonDow } from "../icons";
import { LogoGane } from './logoGane';


export function NavBar() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const rol = user?.rol;

  useOutsideClick(navRef, () => setActiveComponent(null));

  const handleClick = (id: string) => {
    setActiveComponent(prevId => prevId === id ? null : id);
  };

  return (
    <nav className="flex p-3 bg-slate-900 justify-around" ref={navRef}>

      <LogoGane />

      <ul className="flex items-center gap-4 text-white text-xl">

        {/* TODO:  Menu Despegable de Arículos*/}
        <li className="relative">
          <button id='Articulos' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => handleClick('Articulos')} >
            <span>Artículos</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Articulos' && <Articulos rol={rol} />}

        </li>

        {/* TODO:  Menu Despegable de Bodegas*/}
        <li className="relative">
          <button id='Bodegas' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => handleClick('Bodegas')}          >
            <span>Bodegas</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Bodegas' && <Bodegas rol={rol} />}

        </li>

        {/* TODO:  Menu Despegable de Simcards*/}
        <li className="relative">
          <button id='Simcards' className="flex font-semibold text-white items-center hover:text-blue-400" onClick={() => handleClick('Simcards')}          >
            <span>Simcards</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {activeComponent === 'Simcards' && <Simcards rol={rol} />}

        </li>
      </ul>
    </nav>
  );
}