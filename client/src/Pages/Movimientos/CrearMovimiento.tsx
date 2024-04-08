// import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
// import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
// import { type BodegaWithItems } from '../../types/Bodega'
// import { Button, Input, Label, MessageDisplay } from '../../components/ui'
// import { useAuth } from '../../Auth/AuthContext'
// import { useCallback, useState } from 'react'
// import axios from 'axios'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { RenderBodega } from '../../components/Movimientos/RenderBodega'

export function CrearMovimiento(){
  return(
    <DndContext >
      <main className='flex gap-1 m-1'>
        <RenderBodega title='Origen' isOver={false} />
        <RenderBodega title='Destino' isOver={false} />
      </main>
    </DndContext>
  )
}
