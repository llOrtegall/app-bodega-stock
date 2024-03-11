import { useAuth } from "../../Auth/AuthContext";
import { NavItem } from ".";
import { CloseIcon } from "../icons/CloseIcon";
import { HomeIcon } from "../icons/HomeIcon";


export function NavBar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-slate-900 py-4 flex items-center justify-around">
      <figure className="">
        <img width={100} src="gane.png" alt="logo gane" />
      </figure>
      <ul className="flex justify-around font-semibold text-white gap-4">
        <NavItem to="/home">
          <HomeIcon />
        </NavItem>
        <NavItem to="/about">Movimientos</NavItem>
        <NavItem to="/user">Artículos</NavItem>
        <NavItem to="/dashboard">Bodegas</NavItem>
        <NavItem to="/simcards">Simcards</NavItem>
        <li className="flex items-center pt-1">
          <button onClick={logout} title="Cerra Sesión" className="">
            <CloseIcon />
          </button>
        </li>
      </ul>
    </nav>
  )
}