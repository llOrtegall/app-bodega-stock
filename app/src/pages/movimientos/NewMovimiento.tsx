import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { VITE_API_URL } from "@/config/enviroments";
import { BodegaWhitItems } from "@/types/Bodegas";
import { ActivoInsumo } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";

/** 
 * @description función para buscar las bodegas de una sucursal en especifico y actualizar el estado de la bodega correspondiente
*/
async function handleSearchBodega(sucursal: string, company: string, estadoUpdate: React.Dispatch<React.SetStateAction<BodegaWhitItems | null>>) {
  try {
    const reponse = await axios(`${VITE_API_URL}/getBodegaItems/${company}/${sucursal}`);
    estadoUpdate(reponse.data);
  } catch (error) {
    console.log(error);
  }
}

// TODO: componente para renderizar la lista de items
const RenderListItems = ({ items }: { items: ActivoInsumo[] }) => {
  const [search, setSearch] = useState<string>('');

  const itemsFiltered = items.filter((item) => item.placa.includes(search) || item.nombre.includes(search) || item.serial.includes(search));

  return (
    <section className="overflow-auto h-[40vh]">
      <div className="flex gap-1 items-center justify-around py-1">
        <Label>Filtrar Items</Label>
        <Input
          type="text"
          placeholder="Buscar"
          className="w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <article className="w-full">
        <header className="sticky top-0 flex gap-1 justify-around py-1 bg-gray-100">
          <p className="w-3/12 text-left px-1">N° Placa</p>
          <p className="w-5/12 text-left px-1">Nombre</p>
          <p className="w-4/12 text-left px-1">Serial</p>
        </header>
        <section>
          {
            itemsFiltered.map((item) => (
              <div key={item.placa} className="flex gap-1 w-full py-1 border-b">
                <p className="w-3/12 text-left truncate px-1">{item.placa}</p>
                <p className="w-5/12 text-left truncate px-1">{item.nombre}</p>
                <p className="w-4/12 text-left truncate px-1">{item.serial}</p>
              </div>
            ))
          }
        </section>
      </article>
    </section>
  )
}

// TODO: componente para renderizar la información de la bodega
const RenderBodega = ({ bodega }: { bodega: BodegaWhitItems }) => {
  return (
    <>
      <article className="flex text-xs gap-1 justify-around py-1">
        <Badge>{bodega.nombre}</Badge>
        <Badge>{bodega.sucursal}</Badge>
        <Badge>{bodega.direccion}</Badge>
      </article>
      <RenderListItems items={bodega.items} />
    </>
  )
}

export default function NewMovimiento() {
  const { company } = useAuth();

  const [bodega1, setBodega1] = useState<BodegaWhitItems | null>(null);
  const [bodega2, setBodega2] = useState<BodegaWhitItems | null>(null);

  const [search1, setSearch1] = useState<string>('');
  const [search2, setSearch2] = useState<string>('');

  const handleDragStart = (event: DragStartEvent) => {
    console.log('Drag Start', event);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    console.log('Drag End', event);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className='flex items-center justify-around'>
        <h1 className="text-2xl text-center font-semibold py-2">Nuevo Movimiento Entre Bodegas - [ Sucursales ]
        </h1>
      </div>
      <Separator />

      <section className="flex w-full gap-1 px-1 pt-1">

        <Card className="w-1/2 p-2 h-[70vh]">
          <header className="flex items-center justify-around">
            <Label>Buscar Bodega Origen</Label>
            <Input
              type="text"
              placeholder="Sucursal"
              value={search1}
              className="w-[200px]"
              onChange={(e) => setSearch1(e.target.value)}
            />
            <Button
              onClick={() => handleSearchBodega(search1, company, setBodega1)}>Buscar</Button>
          </header>
          {
            bodega1 && <RenderBodega bodega={bodega1} />
          }
        </Card>

        <Card className="w-1/2 p-2 h-[70vh]">
          <header className="flex items-center justify-around">
            <Label>Buscar Bodega Destino</Label>
            <Input
              type="text"
              placeholder="Sucursal"
              value={search2}
              className="w-[200px]"
              onChange={(e) => setSearch2(e.target.value)}
            />
            <Button
              onClick={() => handleSearchBodega(search2, company, setBodega2)}>Buscar</Button>
          </header>
          {
            bodega2 && <RenderBodega bodega={bodega2} />
          }
        </Card>

      </section>
    </DndContext >
  )
}