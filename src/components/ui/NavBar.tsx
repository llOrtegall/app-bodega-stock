import { useAuth } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";

export function NavBar() {
  const { logout } = useAuth();
  return (
    <nav className="bg-blue-200 py-4 flex items-center justify-around">
      <figure className="">
        <img width={100} src="gane.png" alt="logo gane" />
      </figure>
      <ul className="flex justify-around font-semibold text-black">
        <li className="li-navbar">
          <Link to="/home">Home</Link>
        </li>
        <li className="li-navbar">
          <Link to="/about">About</Link>
        </li>
        <li className="li-navbar">
          <Link to="/user">User</Link>
        </li>
        <li className="li-navbar">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="li-navbar">
          <button onClick={logout}>Close Sessión</button>
        </li> 
      </ul>
    </nav>
  )
}