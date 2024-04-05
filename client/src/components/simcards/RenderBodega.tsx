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
  renderInfo?: BodegaWithSims
  title: string
  cart: string[]
}

export function RenderBodega({ fun, sendBodega, renderInfo, title, cart }: Props): JSX.Element {
  const [sucursal, setSucursal] = useState('')

  const { searchSimcard, setSearchSimcard, filteredSimcards } = useFilterSimcards(renderInfo?.simcards || [])

  const { user } = useAuth()
  const company = user.empresa

  const handleSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    fun({ company, sucursal })
      .then(res => {
        sendBodega(res)
      })
  }

  const { isOver, setNodeRef } = useDroppable({
    id: renderInfo?._id || '', data: { type: 'bodega', bodega: renderInfo }
  });

  return (
    <article className="flex flex-col w-full gap-1 ">

      <form className="bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white flex justify-center gap-2 items-center py-2 rounded-lg" onSubmit={handleSubmit}>
        <Label>Buscar {title}</Label>
        <div className="dark:text-black"><Input type="text" placeholder="40001 | 34545" value={sucursal} onChange={(ev) => setSucursal(ev.target.value)} /></div>
        <Button>Buscar Sucursal</Button>
      </form>

      <header className="py-1 bg-blue-300 dark:bg-blue-900 dark:text-white flex justify-around rounded-md">
        <p> <span className="font-semibold">Nombre: </span> {renderInfo?.nombre} </p>
        <p> <span className="font-semibold">Direccion: </span> {renderInfo?.direccion}</p>
        <p> <span className="font-semibold">Sucursal: </span> {renderInfo?.sucursal}</p>
      </header>

      <section className="flex items-center justify-center gap-2 py-1 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white rounded-md">
        <Label>Filtrar Simcard: </Label>
        <div className="dark:text-black"><Input value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)} type="text" placeholder="Número | Serial | Operador" /></div>
      </section>

      <section className="flex p-1 text-white text-center bg-blue-600 dark:bg-blue-900 rounded-md">
        <p className="w-1/3 font-semibold">Número</p>
        <p className="w-1/3 font-semibold">Operador</p>
        <p className="w-1/3 font-semibold">Serial</p>
      </section>

      <section className="flex flex-col h-[220px] 2xl:h-[280px]  3xl:h-[330px] overflow-y-auto" ref={setNodeRef}>
        {filteredSimcards.map(sim => <RenderSimcard key={sim._id} simcard={sim} bodegaOrigen={renderInfo?._id} cart={cart}/>)}
      </section>

      <section ref={setNodeRef}
        className={`flex h-[50px] 2xl:h-[65px] 3xl:h-[75px] rounded-lg justify-center items-center  border-2 border-slate-400 text-slate-600 ${isOver ? 'bg-green-500 dark:' : 'bg-green-200 dark:bg-slate-700'}`}>
        <p className="text-black dark:text-white dark:font-semibold"><AddIcon /></p>
        <p className="text-black dark:text-white dark:font-semibold">Arrastre Simcard Aquí Para Agregar</p>
      </section>

    </article>
  )
}
