// import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
// import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
// import { type BodegaWithItems } from '../../types/Bodega'
// import { Button, Input, Label, MessageDisplay } from '../../components/ui'
// import { useAuth } from '../../Auth/AuthContext'
// import { useCallback, useState } from 'react'
// import axios from 'axios'
import { RenderBodega } from '../../components/Movimientos/RenderBodega'
import { BodegaWithItems, Item } from '../../types/Bodega';
import { DndContext, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react';
import axios from 'axios';
import { SortableContext } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';
import { RenderItems } from '../../components/Movimientos/RenderItems';

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' }

export function CrearMovimiento() {
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithItems>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithItems>(initialState)

  const [cartItems, setCartItems] = useState<string[]>([])
  const [cartItems2, setCartItems2] = useState<string[]>([])

  const bodegasIds = [bodegaOrigen?._id, bodegaDestino?._id]
  const [ItemActive, setItemActive] = useState<Item | null>(null)

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
 

  return (
    <DndContext >
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
