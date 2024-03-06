import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="p-2 bg-blue-500">
      <ul className="flex justify-around font-semibold">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
        <Link to="/user">User</Link>
        <Link to="/dashboard">Dashboard</Link>
      </ul>
    </nav>
  )
}