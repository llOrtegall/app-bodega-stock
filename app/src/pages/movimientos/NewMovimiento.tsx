import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDroppable } from '@dnd-kit/core'
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { VITE_API_URL } from "@/config/enviroments";
import { Textarea } from '@/components/ui/textarea';
import { BodegaWhitItems } from "@/types/Bodegas";
import { ActivoInsumo } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@radix-ui/react-label";
import { Card } from "@/components/ui/card";
import { createPortal } from 'react-dom';
import { CSS } from '@dnd-kit/utilities';
import { PlusIcon } from 'lucide-react';
import { useState } from "react";
import { toast } from 'sonner';
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

const RenderItem = ({ item, bodega, cart }: { item: ActivoInsumo, bodega?: string, cart?: string[] }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item._id, data: { bodega, type: 'item', item } })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  const cssClasses = "flex h-10 bg-sky-700 p-2 rounded-md text-center pl-10 mb-1"

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={{ ...style, cursor: 'grab', opacity: 0.3 }} className={cssClasses} />
    )
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}
      // verificar si el item esta en el carrito de items para cambiar el color de fondo
      className={`${cart?.includes(item._id)
        ? 'flex gap-1 w-full py-1 border-b hover:bg-blue-100 bg-yellow-200'
        : 'flex gap-1 w-full py-1 border-b hover:bg-blue-100'}`} >
      <p className="w-3/12 text-left truncate px-1">{item.placa}</p>
      <p className="w-5/12 text-left truncate px-1">{item.nombre}</p>
      <p className="w-4/12 text-left truncate px-1">{item.serial}</p>
    </div>
  )
}

// TODO: componente para renderizar la lista de items
const RenderListItems = ({ items, bodega, cart }: { items: ActivoInsumo[], bodega: string, cart: string[] }) => {
  const [search, setSearch] = useState<string>('');

  const itemsFiltered = items.filter((item) => item.placa.includes(search) || item.nombre.includes(search) || item.serial.includes(search));

  return (
    <section className="overflow-auto h-[50vh]">
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
          {itemsFiltered.map((item) => <RenderItem key={item._id} bodega={bodega} item={item} cart={cart} />)}
        </section>
      </article>
    </section>
  )
}

// TODO: componente para renderizar la información de la bodega
const RenderBodega = ({ bodega, cartItems }: { bodega: BodegaWhitItems, cartItems: string[] }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: bodega?._id || '', data: { type: 'bodega', bodega: bodega }
  });

  return (
    <>
      <article className="flex text-xs gap-1 justify-around py-1">
        <Badge>{bodega.nombre}</Badge>
        <Badge>{bodega.sucursal}</Badge>
        <Badge>{bodega.direccion}</Badge>
      </article>
      <Separator />
      <RenderListItems items={bodega.items} bodega={bodega._id} cart={cartItems} />
      <section ref={setNodeRef}
        className={`flex h-[50px] 2xl:h-[65px] 3xl:h-[75px] rounded-lg justify-center items-center  border-2 border-slate-400 text-slate-600 
        ${isOver ? 'bg-green-500 dark:' : 'bg-green-200 dark:bg-slate-700'}`}>
        <p className="text-black dark:text-white dark:font-semibold"><PlusIcon /></p>
        <p className="text-black dark:text-white dark:font-semibold">Insertar Item</p>
      </section>
    </>
  )
}

export default function NewMovimiento() {
  const { company, user } = useAuth();

  const nombres = user?.names + ' ' + user?.lastnames

  const [bodega1, setBodega1] = useState<BodegaWhitItems | null>(null);
  const [bodega2, setBodega2] = useState<BodegaWhitItems | null>(null);

  const [search1, setSearch1] = useState<string>('');
  const [search2, setSearch2] = useState<string>('');

  // Revisar está asignación de ids
  const bodegasIds = [bodega1?._id || '', bodega2?._id || '']
  const [ItemActive, setItemActive] = useState<ActivoInsumo | null>(null)

  // Carritos de items
  const [cartItems, setCartItems] = useState<string[]>([])
  const [cartItems2, setCartItems2] = useState<string[]>([])

  const ResetCartsItems = () => {
    setCartItems([])
    setCartItems2([])
  }

  const handleDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'item') {
      setItemActive(event.active.data.current?.item)
      return
    }
  }

  const handleDragEnd = (ev: DragEndEvent) => {
    if (ev.active.data.current?.bodega === ev.over?.id) {
      toast.error('No puedes mover el item a la misma bodega')
      return
    }
    if (ev.active.data.current?.bodega === ev.over?.data.current?.bodega) {
      console.log('Items De La Misma Bodega No Son Sortables Ya Que No Nos Interesa Esa Implementación');
      return
    }
    if (ev.active.data.current?.type === ev.over?.data.current?.type) {
      toast.error('El item debe estar encima del recuadro verde, para agregarlo a la bodega')
      return
    }

    const bodegaSelectedId = ev.over?.data.current?.bodega._id

    updateBodega(bodegaSelectedId)

    function updateBodega(id: string) {

      if (id === bodega2?._id && ItemActive) {
        if (bodega2 !== null && bodega1 !== null) {

          // agregar item a la bodega destino en este caso bodega2
          setBodega2({ ...bodega2, items: [...bodega2.items, ItemActive] })

          // eliminar item de la bodega origen en este caso bodega1
          setBodega1({ ...bodega1, items: bodega1.items.filter(i => i._id !== ItemActive._id) })

          // agregar item al carrito de items
          setCartItems([...cartItems, ItemActive._id])
          return
        } else {
          toast.error('Debe Seleccionar Una Origen y Destino')
          return
        }
      }


      if (id === bodega1?._id && ItemActive) {
        if (bodega1 !== null && bodega2 !== null) {

          // agregar item a la bodega destino en este caso bodega1
          setBodega1({ ...bodega1, items: [...bodega1.items, ItemActive] })

          // eliminar item de la bodega origen en este caso bodega2
          setBodega2({ ...bodega2, items: bodega2.items.filter(i => i._id !== ItemActive?._id) })

          // agregar item al carrito de items
          setCartItems2([...cartItems2, ItemActive._id])
          return
        } else {
          toast.error('Debe Seleccionar Una Origen y Destino')
          return
        }
      }

    }

  }

  const [descripcion, setDescripcion] = useState<string>('')
  const [incidente, setIncidente] = useState<string>('')

  function handleMoveItems() {
    axios.post(`${VITE_API_URL}/moveItem`, {
      bodegas: { bodegaOrigen: bodega1?._id, bodegaDestino: bodega2?._id },
      itemsIds: { entran: cartItems, salen: cartItems2 },
      encargado: nombres,
      descripcion,
      incidente,
      company: company
    })
      .then(res => {
        console.log(res);
        setBodega1(null)
        setBodega2(null)
        setSearch1('')
        setSearch2('')
        setCartItems([]);
        setCartItems2([]);
        setItemActive(null);
        setDescripcion('')
        setIncidente('')
        toast.success('Movimiento Realizado', { description: res.data.message })
      })
      .catch(err => {
        console.log(err);
        toast.error(err.response.data.error)
      })
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      <div className='flex items-center justify-around'>
        <h1 className="text-2xl text-center font-semibold py-2">Nuevo Movimiento Entre Bodegas - [ Sucursales ]
        </h1>
      </div>
      <Separator />

      <section className="flex w-full gap-1 px-1 pt-1">

        <SortableContext items={bodegasIds}>
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
                onClick={() => {
                  handleSearchBodega(search1, company, setBodega1)
                  ResetCartsItems()
                }}>Buscar</Button>
            </header>
            {
              bodega1 && <RenderBodega bodega={bodega1} cartItems={cartItems2} />
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
                onClick={() => {
                  handleSearchBodega(search2, company, setBodega2)
                  ResetCartsItems()
                }}>Buscar</Button>
            </header>
            {
              bodega2 && <RenderBodega bodega={bodega2} cartItems={cartItems} />
            }
          </Card>
        </SortableContext>
      </section>

      <Card className="flex items-center justify-around p-2 m-1">
        <div>
          <Label>Encargado</Label>
          <Input className='w-[300px]' type="text" value={nombres} disabled />
        </div>
        <div>
          <Label>N° Incidente</Label>
          <Input type="text" value={incidente} onChange={ev => setIncidente(ev.target.value)} />
        </div>
        <div>
          <Label>Descripción</Label>
          <Textarea className='w-[300px]' value={descripcion} onChange={ev => setDescripcion(ev.target.value)} />
        </div>
        <Button onClick={handleMoveItems}>Mover Items</Button>
      </Card>

      {
        createPortal(
          <DragOverlay>
            {ItemActive && (<RenderItem item={ItemActive} />)}
          </DragOverlay>,
          document.body
        )
      }
    </DndContext >
  )
}
