import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="p-2 bg-blue-700">
      <ul className="flex justify-around font-semibold">
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
          <Link to="/login">Login</Link>
        </li> 
      </ul>
    </nav>
  )
}