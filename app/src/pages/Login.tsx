import { VITE_LOGIN_URL, VITE_APP_NAME } from '@/config/enviroments'
import { useTheme } from '@/contexts/theme/ThemeProvider'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Sun, Moon } from 'lucide-react'
import { FormEvent } from 'react'
import { toast } from 'sonner'
import axios from 'axios'

function LoginPage() {
  const { setTheme, theme } = useTheme()
  const { setIsAuthenticated } = useAuth()

  const handleLogin = (ev: FormEvent) => {
    ev.preventDefault()

    const { username, password } = Object.fromEntries(new FormData(ev.target as HTMLFormElement))

    if (!username || !password) {
      return toast('Error al iniciar sesión', {
        description: 'Por favor ingrese su usuario y contraseña',
      })
    }

    axios.post(`${VITE_LOGIN_URL}/login`, {
      username,
      password,
      app: VITE_APP_NAME
    })
      .then((res) => {
        console.log(res);
        setIsAuthenticated(true)
      })
      .catch((err) => {
        if (err.message === 'Network Error') {
          return toast('Error al iniciar sesión', {
            description: 'No se pudo conectar con el servidor ó no hay conexión a internet, contacte al administrador del sistema',
          })
        }
        toast('Error al iniciar sesión', {
          description: err.response.data.message,
        })
      })

  }

  return (
    <main className='relative h-screen w-full flex justify-center items-center'>
      {
        theme === 'light'
          ? <div className='absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
          : <div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
      }

      <Button className='absolute top-4 right-4' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
      </Button>

      <form onSubmit={handleLogin}>
        <Card className='w-[400px] flex flex-col p-8 gap-2 pb-12'>
          <figure className='mb-8 w-full flex justify-center'>
            <img src='/gane.webp' alt='Logo' className='w-40' />
          </figure>
          <Label htmlFor='username'>Usuario</Label>
          <Input
            id='username'
            name='username'
            type='text'
            placeholder='CP1118*******'
            autoComplete='username'
            className='mb-4'
          />
          <Label htmlFor='password'>Contraseña</Label>
          <Input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            placeholder='**********'
            className='mb-4'
          />
          <Button type='submit' className='w-full'>Iniciar sesión</Button>
        </Card>
      </form>
      <Toaster />
    </main>
  )
}

export default LoginPage
