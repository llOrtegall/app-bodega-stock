import { useState } from "react";
import { Label, Button, Input } from "../components/ui";

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    console.log({ username, password });
  }


  return (
    <section className="flex justify-center">

      <form className="flex flex-col w-[480px] gap-2 border p-4 mt-10 rounded-lg bg-gray-200" onSubmit={handleSubmit}>
        <Label htmlFor="username">Usuario</Label>
        <Input placeholder="CP141412422" onChange={ ev => setUsername(ev.target.value) }
          type="text" id="username" required />

        <Label htmlFor="password">Contraseña</Label>
        <Input placeholder="**********" onChange={ ev => setPassword(ev.target.value) }
          type="password" id="password" required />

        <Button type="submit">Ingresar</Button>
      </form>

    </section>
  )
}