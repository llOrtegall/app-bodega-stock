import { MessageDisplay } from '../components/ui/MessagesDisplay'
import { Label, Button, Input, Loading } from '../components/ui'
import { useLogin } from '../hooks/useLogin'

export function LoginPage (): JSX.Element {
  const { setPassword, setUsername, handleSubmit, error, loading, message } = useLogin()

  return (
    <section className="w-full h-screen bg-gradient-to-r from-blue-400 to-blue-800 items-center justify-center flex flex-col">

      <form className='w-1/3 backdrop-blur-md bg-white/30 py-12 rounded-lg flex flex-col gap-8 px-28 mb-4'>
        <figure className='flex justify-center'>
          <img src="gane.png" alt="" width={180} />
        </figure>

        <div className='flex flex-col gap-2'>
          <Label>Usuario / Username </Label>
          <Input type='text' placeholder='CP1118342523'
            onChange={ev => { setUsername(ev.target.value) }} />
        </div>

        <div className='flex flex-col gap-2'>
          <Label>Contraseña / Password</Label>
          <Input type='password' placeholder='**********'
            onChange={ev => { setPassword(ev.target.value) }} />
        </div>

        <Button onClick={handleSubmit}>Iniciar Sesión</Button>
      </form>

      <section className='h-10'>
        <MessageDisplay message={message} error={error} />
        {loading && <Loading />}
      </section>
    </section>
  )
}
