import { Label, Button, Input } from "../components/ui";

export function LoginPage() {
  return (
    <section className="flex justify-center">

      <form className="flex flex-col w-[480px] gap-2 border p-4 mt-10 rounded-lg bg-gray-200">
        <Label htmlFor="usuario">Usuario</Label>
        <Input placeholder="CP141412422" 
          type="text" id="usuario" required />

        <Label htmlFor="password">Contraseña</Label>
        <Input placeholder="**********" 
          type="password" id="password" required />

        <Button type="submit">Ingresar</Button>
      </form>

    </section>
  )
}