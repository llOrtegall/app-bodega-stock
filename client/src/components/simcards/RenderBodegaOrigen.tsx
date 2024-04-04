import { BodegaWithSims } from "../../types/Simcard.interfaces"
import { useAuth } from "../../Auth/AuthContext"
import { Button, Input, Label } from "../ui"
import { useState } from "react"

interface Props {
  fun: ({ company, sucursal }: { sucursal: string, company: string }) => Promise<BodegaWithSims>
  sendBodega: (bodega: BodegaWithSims) => void
  renderInfo: BodegaWithSims
}

export function RenderBodega({ fun, sendBodega, renderInfo }: Props): JSX.Element {
  const [sucursal, setSucursal] = useState('')

  const { user } = useAuth()
  const company = user.empresa

  const handleSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    fun({ company, sucursal })
      .then(res => sendBodega(res))
  }

  return (
    <article className="w-full flex flex-col gap-2">
      <form className="w-full p-1 bg-blue-300 flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={handleSubmit}>
        <Label>Buscar Bodega Origen</Label>
        <Input type="text" placeholder="40001 | 34545" value={sucursal} onChange={(ev) => setSucursal(ev.target.value)} />
        <div><Button>Buscar Sucursal</Button></div>
      </form>

      <header className="w-full p-1 bg-blue-300 flex items-center gap-4 text-center col-span-2 place-content-center">
        <p> <span className="font-semibold">Nombre: </span> {renderInfo.nombre} </p>
        <p> <span className="font-semibold">Direccion: </span> {renderInfo.direccion}</p>
        <p> <span className="font-semibold">Sucursal: </span> {renderInfo.sucursal}</p>
      </header>

      <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md  text-white">
        <p className="font-semibold">Número</p>
        <p className="font-semibold">Operador</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Agregar</p>
      </section>


    </article>
  )
}
