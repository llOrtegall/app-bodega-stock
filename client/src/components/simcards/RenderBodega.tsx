import { BodegaWithSims } from "../../types/Simcard.interfaces"
import { RenderSimcard } from "./RenderSimcard"
import { useAuth } from "../../Auth/AuthContext"
import { useFilterSimcards } from "../../hooks"
import { Button, Input, Label } from "../ui"
import { useDroppable } from "@dnd-kit/core"
import { useState } from "react"
import { AddIcon } from "../icons"

interface Props {
  fun: ({ company, sucursal }: { sucursal: string, company: string }) => Promise<BodegaWithSims>
  sendBodega: (bodega: BodegaWithSims) => void
  renderInfo: BodegaWithSims
  title: string
  cart: string[]
}

export function RenderBodega({ fun, sendBodega, renderInfo, title, cart }: Props): JSX.Element {
  const [sucursal, setSucursal] = useState('')
  const { searchSimcard, setSearchSimcard, filteredSimcards } = useFilterSimcards(renderInfo.simcards)

  const { user } = useAuth()
  const company = user.empresa

  const handleSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    fun({ company, sucursal })
      .then(res => sendBodega(res))
  }

  const { isOver, setNodeRef } = useDroppable({
    id: renderInfo._id, data: { type: 'bodega', bodega: renderInfo }
  });

  return (
    <article className="w-full flex flex-col gap-2">
      <form className="w-full p-1 bg-blue-300 flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={handleSubmit}>
        <Label>Buscar {title}</Label>
        <Input type="text" placeholder="40001 | 34545" value={sucursal} onChange={(ev) => setSucursal(ev.target.value)} />
        <div><Button>Buscar Sucursal</Button></div>
      </form>

      <header className="w-full p-1 bg-blue-300 flex items-center gap-4 text-center col-span-2 place-content-center">
        <p> <span className="font-semibold">Nombre: </span> {renderInfo.nombre} </p>
        <p> <span className="font-semibold">Direccion: </span> {renderInfo.direccion}</p>
        <p> <span className="font-semibold">Sucursal: </span> {renderInfo.sucursal}</p>
      </header>

      <section className="flex items-center justify-center gap-4 mx-4">
        <Label>Filtrar Simcard: </Label>
        <div className="w-3/5">
          <Input value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)}
            displaySize="w-full" type="text" placeholder="Número | Serial | Operador" />
        </div>
      </section>

      <section className="w-full flex p-2 rounded-lg text-white text-center bg-blue-600">
        <p className="w-1/3 font-semibold">Número</p>
        <p className="w-1/3 font-semibold">Operador</p>
        <p className="w-1/3 font-semibold">Serial</p>
      </section>

      <section className="flex flex-col h-[250px] overflow-y-auto" ref={setNodeRef}>
        {filteredSimcards.map(sim => <RenderSimcard key={sim._id} simcard={sim} bodegaOrigen={renderInfo._id} cart={cart}/>)}
      </section>

      <section ref={setNodeRef}
        className={`flex h-[100px] justify-center items-center  rounded-lg border-2 border-slate-400 text-slate-600 ${isOver ? 'bg-green-200' : 'bg-green-100'}`}>
        <p><AddIcon /></p>
        <p>Arrastre Simcard Aquí Para Agregar</p>
      </section>

    </article>
  )
}
