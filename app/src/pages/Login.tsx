import { VITE_LOGIN_URL } from "@/config/enviroments"
import { useTheme } from "@/contexts/theme/ThemeProvider"
import { useAuth } from "@/contexts/auth/AuthProvider"
import { Toaster } from '@/components/ui/sonner'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { FormEvent, useState } from "react"
import { Sun, Moon } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

function LoginPage() {
  const { setTheme, theme } = useTheme()
  const { setIsAuthenticated } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault()
    setLoading(true)

    axios.post(`${VITE_LOGIN_URL}/login`, { username, password })
      .then((res) => {
        console.log(res);
        setIsAuthenticated(true)
      })
      .catch((err) => {
        toast('Error al iniciar sesión', {
          description: err.response.data.message,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className="relative h-screen w-full flex justify-center items-center">
      {
        theme === 'light'
          ? <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          : <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      }

      <Button className="absolute top-4 right-4" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </Button>

      <form onSubmit={handleLogin}>
        <Card className="w-[400px] flex flex-col p-8 gap-2 pb-12">
          <figure className="mb-8 w-full flex justify-center">
            <img src="/gane.webp" alt="Logo" className="w-40" />
          </figure>
          <Label htmlFor="username">Usuario</Label>
          <Input
            id="username"
            type="username"
            placeholder="CP1118*******"
            className="mb-4"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            placeholder="**********"
            className="mb-4"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {
              loading ? <div className='flex items-center justify-center gap-2'>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                </svg>
                Iniciando ...</div> : 'Iniciar Sesion'
            }
          </Button>
        </Card>
      </form>
      <Toaster />
    </main>
  )
}

export default LoginPage
