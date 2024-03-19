import { MessageDisplay } from '../components/ui/MessagesDisplay'
import { Label, Button, Input, Loading } from '../components/ui'
import { useLogin } from '../hooks/useLogin'

export function LoginPage (): JSX.Element {
  const { setPassword, setUsername, handleSubmit, error, loading, message } = useLogin()

  return (
    <section className="w-full h-screen bg-slate-900 flex flex-col justify-center items-center space-y-4 relative">

      <form className="flex flex-col items-center bg-slate-300 gap-12 py-12 px-12 rounded-md" onSubmit={handleSubmit}>
        <figure className="">
          <img src="gane.png" width={200} alt="logo de gane" />
        </figure>

        <article className="flex flex-col w-[320px] gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="username" textSize='xl'>Usuario:</Label>
            <Input placeholder="CP141412422" onChange={ev => { setUsername(ev.target.value) }}
              type="text" id="username" required />
          </div>
          <div className="flex items-center justify-between mb-6">
            <Label htmlFor="password" textSize='xl'>Contraseña:</Label>
            <Input placeholder="**********" onChange={ev => { setPassword(ev.target.value) }}
              type="password" id="password" required />
          </div>
          <Button textSize='xl'>Iniciar Sesión</Button>
        </article>
      </form>

      <section className="w-full flex flex-col items-center absolute bottom-40 mb-4">
        <MessageDisplay message={message} error={error} />
        {loading && <Loading />}
      </section>

    </section>
  )
}
