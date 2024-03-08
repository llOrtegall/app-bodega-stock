import { useAuth } from "../../Auth/AuthContext";
import { NavItem } from ".";


export function NavBar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-blue-200 py-4 flex items-center justify-around">
      <figure className="">
        <img width={100} src="gane.png" alt="logo gane" />
      </figure>
      <ul className="flex justify-around font-semibold text-black gap-4">
        <NavItem to="/home">Home</NavItem>
        <NavItem to="/about">About</NavItem>
        <NavItem to="/user">User</NavItem>
        <NavItem to="/dashboard">Dashboard</NavItem>
        <li className="">
          <button onClick={logout}>Salir</button>
        </li>
      </ul>
    </nav>
  )
}