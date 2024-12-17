import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function LoginPage() {

  return (
    <section className="w-full h-[100vh] flex flex-col items-center justify-center bg-gradient-to-b from-blue-400 to-blue-200">

      <form className='w-96 mb-2 border p-12 rounded-lg bg-white/30 flex flex-col gap-4 shadow-xl'>
        <figure className='flex justify-center'>
          <img src="/gane.webp" className='w-20 xl:w-24 1xl:w-28 3xl:w-32' />
        </figure>

        <article className='w-full flex flex-col gap-2'>
          <Label>Usuario</Label>
          <div className='w-full flex items-center gap-2 justify-around'>
            <Input />
          </div>
        </article>

        <article className='w-full flex flex-col gap-2'>
          <Label>Contraseña</Label>
          <div className='w-full flex items-center gap-2 justify-around'>
            <Input />
          </div>
        </article>

        <Button>Iniciar Sesión</Button>
      </form>

    </section>
  )
}

export default LoginPage
