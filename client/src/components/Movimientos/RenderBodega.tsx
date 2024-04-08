import { Button, Input, Label } from "../ui"
import { useDroppable } from "@dnd-kit/core"
import { useState } from "react"
import { AddIcon } from "../icons"

interface Props {
  title: string
  isOver: boolean
}

export function RenderBodega({ title, isOver }: Props): JSX.Element {

  return (
    <article className="flex flex-col w-full gap-1 ">

      <form className="bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white flex justify-center gap-2 items-center py-2 rounded-lg" >
        <Label>Buscar {title}</Label>
        <div className="dark:text-black"><Input type="text" placeholder="40001 | 34545"/></div>
        <Button>Buscar Sucursal</Button>
      </form>

      <header className="py-1 bg-blue-300 dark:bg-blue-900 dark:text-white flex justify-around rounded-md">
        <p> <span className="font-semibold">Nombre: </span> {} </p>
        <p> <span className="font-semibold">Direccion: </span> {}</p>
        <p> <span className="font-semibold">Sucursal: </span> {}</p>
      </header>

      <section className="flex items-center justify-center gap-2 py-1 bg-blue-200 dark:bg-dark-tremor-brand-muted dark:text-white rounded-md">
        <Label>Filtrar Simcard: </Label>
        <div className="dark:text-black">
          <Input type="text" placeholder="Número | Serial | Operador" />
        </div>
      </section>

      <section className="flex p-1 text-white text-center bg-blue-600 dark:bg-blue-900 rounded-md">
        <p className="w-1/3 font-semibold">Número</p>
        <p className="w-1/3 font-semibold">Operador</p>
        <p className="w-1/3 font-semibold">Serial</p>
      </section>

      <section className="flex flex-col h-[220px] 2xl:h-[280px]  3xl:h-[330px] overflow-y-auto" >
        {/* filteredSimcards.map(sim => <RenderSimcard key={sim._id} simcard={sim} bodegaOrigen={renderInfo?._id} cart={cart}/>) */}
      </section>

      <section 
        className={`flex h-[50px] 2xl:h-[65px] 3xl:h-[75px] rounded-lg justify-center items-center  border-2 border-slate-400 text-slate-600 
        ${isOver ? 'bg-green-500 dark:' : 'bg-green-200 dark:bg-slate-700'}`}>
        <p className="text-black dark:text-white dark:font-semibold"><AddIcon /></p>
        <p className="text-black dark:text-white dark:font-semibold">Arrastre Simcard Aquí Para Agregar</p>
      </section>

    </article>
  )
}
