import { BodegaWithItems } from "../../types/Bodega"
import { useAuth } from "../../Auth/AuthContext"
import { useFiltersItems } from "../../hooks"
import { Button, Input, Label } from "../ui"
import { useDroppable } from "@dnd-kit/core"
import { RenderItems } from "./RenderItems"
import { AddIcon } from "../icons"
import { useState } from "react"

interface Props {
  title: string
  sendBodega: (bodega: BodegaWithItems) => any
  fun: ({ company, sucursal }: { sucursal: string, company: string }) => Promise<BodegaWithItems>
  renderInfo?: BodegaWithItems
  cart: string[]
}

export function RenderBodega({ title, fun, cart, renderInfo, sendBodega }: Props): JSX.Element {
  const [sucursal, setSucursal] = useState('')
  const { user } = useAuth()
  const company = user?.company!

  console.log(renderInfo);
  
  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(renderInfo?.items || [])

  const handleSubmit = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    fun({ company, sucursal })
      .then(res => {
        sendBodega(res);
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
        <p> <span className="font-semibold">Nombre: </span> { renderInfo?.nombre} </p>
        <p> <span className="font-semibold">Direccion: </span> { renderInfo?.direccion }</p>
        <p> <span className="font-semibold">Sucursal: </span> { renderInfo?.sucursal }</p>
      </header>

      <section className="flex items-center justify-center gap-2 py-1 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white rounded-md">
        <Label>Filtrar Item: </Label>
        <div className="dark:text-black">
          <Input type="text" value={searchItems} placeholder="Nombre | N° Activo | Serial " onChange={ev => setSearchItems(ev.target.value)} />
        </div>
      </section>

      <section className="flex p-1 text-white text-center bg-blue-600 dark:bg-blue-900 rounded-md">
        <p className="w-1/3 font-semibold">Nombre</p>
        <p className="w-1/3 font-semibold">Placa</p>
        <p className="w-1/3 font-semibold">Serial</p>
      </section>

      <section className="flex flex-col h-[220px] 2xl:h-[280px]  3xl:h-[330px] overflow-y-auto" ref={setNodeRef}>
        {filteredItems.map(sim => <RenderItems key={sim._id} item={sim} cart={cart} bodegaOrigen={renderInfo?._id} /> )}
      </section>

      <section ref={setNodeRef}
        className={`flex h-[50px] 2xl:h-[65px] 3xl:h-[75px] rounded-lg justify-center items-center  border-2 border-slate-400 text-slate-600 
        ${isOver ? 'bg-green-500 dark:' : 'bg-green-200 dark:bg-slate-700'}`}>
        <p className="text-black dark:text-white dark:font-semibold"><AddIcon /></p>
        <p className="text-black dark:text-white dark:font-semibold">Arrastre Item Aquí Para Agregar</p>
      </section>

    </article>
  )
}
