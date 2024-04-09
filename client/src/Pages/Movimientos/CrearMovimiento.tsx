import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { RenderBodega } from '../../components/Movimientos/RenderBodega'
import { RenderItems } from '../../components/Movimientos/RenderItems';
import { BodegaWithItems, Item } from '../../types/Bodega';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { useState } from 'react';
import axios from 'axios';

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' }

export function CrearMovimiento() {
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithItems>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithItems>(initialState)

  const [cartItems, setCartItems] = useState<string[]>([])
  const [cartItems2, setCartItems2] = useState<string[]>([])

  const bodegasIds = [bodegaOrigen?._id, bodegaDestino?._id]
  const [ItemActive, setItemActive] = useState<Item | null>(null)

  const [error, setError] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<BodegaWithItems> => {
    setCartItems([]); setCartItems2([]);
    const response = await axios.get(`/getBodegaItems/${company}/${sucursal}`)
    return response.data as BodegaWithItems
  }

  function handleDragStart (ev: DragStartEvent) {
    if (ev.active.data.current?.type === 'item') {
      setItemActive(ev.active.data.current?.item)
      return
    }
  }

  function handleDragEnd(ev: DragEndEvent){
    if (ev.active.id === ev.over?.id) {
      console.log('Simcard No Se Movio');
      return
    }
    if (ev.active.data.current?.bodegaOrigen === ev.over?.id) {
      console.log('Misma bodega');
      return
    }
    if (ev.active.data.current?.bodegaOrigen === ev.over?.data.current?.bodegaOrigen) {
      console.log('Items De La Misma Bodega No Son Sortables Ya Que No Nos Interesa Esa Implementación');
      return
    }

    if (ev.active.data.current?.type === ev.over?.data.current?.type) {
      console.log('El Item Debe Estar Encima Del Recuadro Verde');
      return
    }

    const bodegaSelectedId = ev.over?.data.current?.bodega._id

    updateBodega(bodegaSelectedId)

    function updateBodega(id: string) {
      if (id === bodegaDestino._id && ItemActive) {
        if (bodegaDestino !== initialState) {
          console.log('Simcard(En Origen) => Bodega Destino');
          ItemActive ? setBodegaDestino({ ...bodegaDestino, items: [...bodegaDestino.items, ItemActive] }) : null
          setBodegaOrigen({ ...bodegaOrigen, items: bodegaOrigen.items.filter(sim => sim._id !== ItemActive?._id) })
          setCartItems([...cartItems, ItemActive._id])
          return
        } else {
          setError('Debe Seleccionar Una Bodega Destino')
          setTimeout(() => {
            setError('')
          }, 4000)
          return
        }
      }

      if (id === bodegaOrigen._id && ItemActive) {
        if (bodegaOrigen !== initialState) {
          console.log('Simcard(En Destino)  => Bodega Origen');
          ItemActive ? setBodegaOrigen({ ...bodegaOrigen, items: [...bodegaOrigen.items, ItemActive] }) : null
          setBodegaDestino({ ...bodegaDestino, items: bodegaDestino.items.filter(sim => sim._id !== ItemActive?._id) })
          setCartItems2([...cartItems2, ItemActive._id])
          return
        } else {
          setError('Debe Seleccionar Una Bodega Origen')
          setTimeout(() => {
            setError('')
          }, 4000)
          return
        }
      }
    }
  }
 

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className='flex gap-1 m-1'>
        <SortableContext items={bodegasIds}>
          <RenderBodega title='Bodega Origen' cart={cartItems2} renderInfo={bodegaOrigen}
            sendBodega={setBodegaOrigen} fun={getBodega} />
          <RenderBodega title='Bodega Destino' cart={cartItems} renderInfo={bodegaDestino}
            sendBodega={setBodegaDestino} fun={getBodega} />
        </SortableContext>
      </main>

      {
        createPortal(
          <DragOverlay>
            {ItemActive && (<RenderItems item={ItemActive} bodegaOrigen={bodegaOrigen._id} cart={cartItems} />)}
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  )
}
