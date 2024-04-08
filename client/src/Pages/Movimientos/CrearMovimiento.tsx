// import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
// import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
// import { type BodegaWithItems } from '../../types/Bodega'
// import { Button, Input, Label, MessageDisplay } from '../../components/ui'
// import { useAuth } from '../../Auth/AuthContext'
// import { useCallback, useState } from 'react'
// import axios from 'axios'
import { RenderBodega } from '../../components/Movimientos/RenderBodega'
import { BodegaWithItems } from '../../types/Bodega';
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react';
import axios from 'axios';

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: ''}

export function CrearMovimiento(){
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithItems>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithItems>(initialState)

  const [cartItems, setCartItems] = useState<string[]>([])
  const [cartItems2, setCartItems2] = useState<string[]>([])

  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<BodegaWithItems> => {
    setCartItems([]); setCartItems2([]);
    const response = await axios.get(`/getBodegaItems/${company}/${sucursal}`)
    return response.data as BodegaWithItems
  }

  return(
    <DndContext >
      <main className='flex gap-1 m-1'>
        <RenderBodega title='Bodega Origen' cart={cartItems2} renderInfo={bodegaOrigen}
          sendBodega={setBodegaOrigen} isOver={false} fun={getBodega}/>
        <RenderBodega title='Bodega Destino' cart={cartItems} renderInfo={bodegaDestino}
          sendBodega={setBodegaDestino} isOver={false} fun={getBodega}/>
      </main>
    </DndContext>
  )
}
