import { Label, Button, Input } from "../components/ui";

export function LoginPage() {
  return (
    <section className="w-full">

      <form>
        <Label htmlFor="email">Correo</Label>
        <Input placeholder="correo@ejemplo.com" type="email" id="email" required />

        <Label htmlFor="password">Contraseña</Label>
        <Input placeholder="**********" type="password" id="password" required />

        <Button type="submit">Enviar</Button>
      </form>

    </section>
  )
}