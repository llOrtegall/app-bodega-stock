import { MessageDisplay } from '../components/ui/MessagesDisplay'
import { Label, Button, Input, Loading } from '../components/ui'
import { useLogin } from '../hooks/useLogin'
import { LockIcon, UserIcon } from '../components/icons'

export function LoginPage (): JSX.Element {
  const { setPassword, setUsername, handleSubmit, error, loading, message } = useLogin()

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center bg-hero-pattern bg-center bg-no-repeat bg-cover">

      <form className='backdrop-blur-md bg-white/30 py-12 rounded-lg flex flex-col gap-8 px-14 mb-4'>
        <figure className='flex justify-center'>
          <img src="gane.webp" alt="" width={180} />
        </figure>

        <article className='w-full flex flex-col gap-2 text-3xl'>
          <Label>Usuario</Label>
          <div className='w-full flex items-center gap-2'>
            <UserIcon />
            <Input type='text' placeholder='CP1118342523'
              onChange={ev => { setUsername(ev.target.value) }} />
          </div>
        </article>

        <article className='w-full flex flex-col gap-2 text-3xl'>
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
