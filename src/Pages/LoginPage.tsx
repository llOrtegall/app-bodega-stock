import axios from "axios";
import { Label, Button, Input } from "../components/ui";
import { useState } from "react";

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    axios.post('/login', {user: username, password})
      .then(response => {
        console.log(response.data);
      })
      .catch(err => {
        setError(err.response.data.message);
      })

  }


  return (
    <section className="flex flex-col items-center justify-center">

      <form className="flex flex-col w-[480px] gap-2 border p-4 mt-10 rounded-lg bg-gray-200" onSubmit={handleSubmit}>
        <Label htmlFor="username">Usuario</Label>
        <Input placeholder="CP141412422" onChange={ev => setUsername(ev.target.value)}
          type="text" id="username" required />

        <Label htmlFor="password">Contraseña</Label>
        <Input placeholder="**********" onChange={ev => setPassword(ev.target.value)}
          type="password" id="password" required />

        <Button type="submit">Ingresar</Button>
      </form>

      {
        error && <p className="text-red-500">{error}</p>
      }

    </section>
  )
}