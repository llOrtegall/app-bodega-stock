import { useState } from "react"

export default function Register() {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="bg-blue-100 h-screen w-screen flex items-center">
      <form className="w-64 mx-auto mb-12">
        <input value={usuario}
          onChange={ev => setUsuario(ev.target.value)}
          type="text" placeholder="Usuario"
          className="block w-full rounded-md p-2 mb-2 border" />
        <input value={password}
          onChange={ev => setPassword(ev.target.value)} type="password" placeholder="Password"
          className="block w-full rounded-md p-2 mb-2 border" />
        <button className="bg-blue-500 text-white block w-full rounded-md p-2">Register</button>
      </form>
    </section>
  )
}