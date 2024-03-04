import { Input } from "./components/ui/Input"


function App (){
  return(
    <section className="h-screen flex items-center justify-center flex-col gap-2">

      <Input placeholder="correo@ejemplo.com" type="email" id="email" required/>
      <Input placeholder="**********" type="password" id="password" required/>
      
    </section>
  )
}

export default App
