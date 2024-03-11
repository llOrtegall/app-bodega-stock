import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <h3>Ir al inicio</h3>
      <Link to="/home">Inicio</Link>
    </div>
  )
} 