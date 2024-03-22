import { MessageDisplay } from '../components/ui/MessagesDisplay'
import { Label, Button, Input, Loading } from '../components/ui'
import { useLogin } from '../hooks/useLogin'
import { LockIcon, UserIcon } from '../components/icons'

export function LoginPage (): JSX.Element {
  const { setPassword, setUsername, handleSubmit, error, loading, message } = useLogin()

  return (
    <section className="w-full h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-200">

      <form className='w-96 mb-2 border p-12 rounded-lg bg-white/30 flex flex-col gap-4 shadow-xl'>
        <figure className='flex justify-center'>
          <img src="gane.webp" alt="" width={180} />
        </figure>

        <article className='w-full flex flex-col gap-2'>
          <Label>Usuario</Label>
          <div className='w-full flex items-center gap-2'>
            <UserIcon />
            <Input type='text' placeholder='CP1118342523'
              onChange={ev => { setUsername(ev.target.value) }} />
          </div>
        </article>

        <article className='w-full flex flex-col gap-2'>
          <Label>Contraseña</Label>
          <div className='w-full flex items-center gap-2'>
            <LockIcon />
            <Input type='password' placeholder='**********'
              onChange={ev => { setPassword(ev.target.value) }} />
          </div>
        </article>

        <Button onClick={handleSubmit}>Iniciar Sesión</Button>
      </form>

      <section className='h-10'>
        <MessageDisplay message={message} error={error} />
        {loading && <Loading />}
      </section>
    </section>
  )
}
