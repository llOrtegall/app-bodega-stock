import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex p-3 bg-slate-900">
      <figure>
        <img src="/gane.png" width={110} alt="Foto Gane" />
      </figure>
      <ul>
        <li>
          <NavLink to={"/home"} className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        </li>
      </ul>
    </nav>
  );
}