import { Label, Button, Input } from "../components/ui";
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import axios from "axios";
import { MessageDisplay } from "../components/ui/MessagesDisplay";

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    setMessage('Iniciando sesión...');

    axios.post('/login', { user: username, password })
      .then(response => {
        login(response.data.token);
        localStorage.setItem('tokenBodega', response.data.token);
      })
      .catch(err => {
        setMessage('');
        setError(err.response.data.message);
        setTimeout(() => {
          setError('');
        }, 3000);
      })

  }


  return (
    <section className="h-screen flex items-center justify-center flex-col pb-12 bg-slate-900">


      <div className="flex flex-col items-center border py-12 rounded-md bg-gray-200">
        <figure>
          <img src="gane.png" width={200} alt="logo de gane" />
        </figure>

        <form className="flex flex-col w-[420px] mt-10 gap-6 px-10" onSubmit={handleSubmit}>
          <div className="flex w-full flex-col">
            <Label htmlFor="username">Usuario</Label>
            <Input placeholder="CP141412422" onChange={ev => setUsername(ev.target.value)}
              type="text" id="username" required />
          </div>
          <div className="flex w-full flex-col">
            <Label htmlFor="password">Contraseña</Label>
            <Input placeholder="**********" onChange={ev => setPassword(ev.target.value)}
              type="password" id="password" required />
          </div>
          <Button type="submit">Iniciar Sesión</Button>
        </form>
      </div>


      {
        error && <MessageDisplay error={error} message={message} />
      }

    </section>
  )
}