// import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
// import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
// import { type BodegaWithItems } from '../../types/Bodega'
// import { Button, Input, Label, MessageDisplay } from '../../components/ui'
// import { useAuth } from '../../Auth/AuthContext'
// import { useCallback, useState } from 'react'
// import axios from 'axios'
import { RenderBodega } from '../../components/Movimientos/RenderBodega'
import { DndContext } from '@dnd-kit/core'
import { useState } from 'react';
import axios from 'axios';

export function CrearMovimiento(){

  const [cartItems, setCartItems] = useState<string[]>([])
  const [cartItems2, setCartItems2] = useState<string[]>([])

  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<any> => {
    setCartItems([]); setCartItems2([]);
    const response = await axios.get(`/getBodegaItems/${company}/${sucursal}`)
    return response
  }

  return(
    <DndContext >
      <main className='flex gap-1 m-1'>
        <RenderBodega title='Bodega Origen' isOver={false} fun={getBodega}/>
        <RenderBodega title='Bodega Destino' isOver={false} fun={getBodega}/>
      </main>
    </DndContext>
  )
}
