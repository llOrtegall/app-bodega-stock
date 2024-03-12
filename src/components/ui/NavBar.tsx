import { useState, useEffect, useRef } from 'react';
import { useAuth } from "../../Auth/AuthContext";
import { ButtonDow } from "../icons";
import { Articulos } from "./NavLinks";

export function NavBar() {
  const { user } = useAuth();
  const rol = user?.rol;
  const [showArticulos, setShowArticulos] = useState(false);
  const node = useRef<HTMLLIElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (node.current && !node.current.contains(e.target as Node)) {
      setShowArticulos(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="flex p-3 bg-slate-900 justify-around">
      <figure>
        <img src="/gane.png" width={110} alt="Foto Gane" />
      </figure>
      <ul className="flex items-center gap-4 text-white text-xl">
        <li className="relative" ref={node}>
          <button 
            id='Articulos' 
            className="flex font-semibold text-white items-center hover:text-blue-400" 
            onClick={() => setShowArticulos(!showArticulos)}
          >
            <span>Artículos</span>
            <figure className="flex items-center pt-1">
              <ButtonDow />
            </figure>
          </button>

          {showArticulos && <Articulos key={'articulos'} rol={rol}/>}

        </li>
      </ul>
    </nav>
  );
}