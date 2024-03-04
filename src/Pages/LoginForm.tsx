import { Label, Button, Input } from "../components/ui";

export function FormLogin() {
  return (
    <section className="h-screen flex items-center justify-center flex-col gap-2">

      <Label htmlFor="email">Correo</Label>
      <Input placeholder="correo@ejemplo.com" type="email" id="email" required />

      <Label htmlFor="password">Contraseña</Label>
      <Input placeholder="**********" type="password" id="password" required />

      <Button type="submit">Enviar</Button>


    </section>
  )
}