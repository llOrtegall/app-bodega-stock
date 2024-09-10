import { Image, LockIcon, UserIcon } from '../components/icons'
import { Label, Button, Input } from '../components/ui'
import { APP_NAME, LOGIN_URL } from '../utils/constans'
import { useAuth } from '../Auth/AuthContext'
import { toast, Toaster } from 'sonner'
import { useState } from 'react'
import axios from 'axios'


function LoginPage (): JSX.Element {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { setIsAuthenticated } = useAuth()

  const handleSubmit = (ev: React.FormEvent): void => {
    ev.preventDefault()

    axios.post(`${LOGIN_URL}/login`, { username, password, app: APP_NAME })
      .then(res => {
        if( res.status === 200 ) {
          setIsAuthenticated(true)
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          const errorString = err.response.data
          if (typeof errorString === 'string') {
            toast.error(errorString, { description: 'Error al iniciar sesión' })
          }
        }
      })
  }

  return (
    <section className="w-full h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-200">

      <form className='w-96 mb-2 border p-12 rounded-lg bg-white/30 flex flex-col gap-4 shadow-xl' onSubmit={handleSubmit}>
        <figure className='flex justify-center'>
          <Image src="/gane.webp" className='w-20 xl:w-24 1xl:w-28 3xl:w-32' />
        </figure>

        <article className='w-full flex flex-col gap-2'>
          <Label>Usuario</Label>
          <div className='w-full flex items-center gap-2 justify-around'>
            <UserIcon size='w-6 xl:w-7 2xl:w-8 3xl:w-10'/>
            <Input name='username' type='text' placeholder='CP1118342523' autoComplete='username' required
              onChange={ev => { setUsername(ev.target.value) }} />
          </div>
        </article>

        <article className='w-full flex flex-col gap-2'>
          <Label>Contraseña</Label>
          <div className='w-full flex items-center gap-2 justify-around'>
            <LockIcon size='w-6 xl:w-7 2xl:w-8 3xl:w-10' />
            <Input name='password' type='password' placeholder='**********' autoComplete='username' required
              onChange={ev => { setPassword(ev.target.value) }} />
          </div>
        </article>

        <Button type='submit'>Iniciar Sesión</Button>
      </form>

      <Toaster duration={5000} richColors position='top-right' />

    </section>
  )
}

export default LoginPage
