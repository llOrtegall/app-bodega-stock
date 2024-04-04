import { BodegaWithSims, SimcardNoBodega } from '../../types/Simcard.interfaces'
import { RenderSimcard } from '../../components/simcards/RenderSimcard'
import { RenderBodega } from '../../components/simcards/RenderBodega'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import axios from 'axios'

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' }

export function CreaMovimientosSim(): JSX.Element {
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithSims>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithSims>(initialState)

  // TODO: Esta función se está pasando como prop a los componentes Render bodega pero lo mejor sera llamarlo desde el componente con un servicio
  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<BodegaWithSims> => {
    const response = await axios.get(`/getBodegaSimcards/${company}/${sucursal}`)
    return response.data as BodegaWithSims
  }

  const bodegasIds = [bodegaOrigen._id, bodegaDestino._id]
  const [SimcardActive, setSimcardActive] = useState<SimcardNoBodega | null>(null)

  return (
    <DndContext>
      <main className="flex gap-2 mx-2 mt-2">
        <SortableContext items={bodegasIds}>
          <RenderBodega fun={getBodega} sendBodega={setBodegaOrigen} renderInfo={bodegaOrigen} />
          <RenderBodega fun={getBodega} sendBodega={setBodegaDestino} renderInfo={bodegaDestino} />
        </SortableContext>
      </main>

      <footer className='flex w-full justify-center pt-2'>
        <p className='text-center text-slate-600'>Aquí va ir la inf extra del mov simcard</p>
      </footer>

      {
        createPortal(
          <DragOverlay>
            {SimcardActive ? <RenderSimcard simcard={SimcardActive} /> : null}
          </DragOverlay>,
          document.body
        )
      }
    </DndContext>
  )
}


// const handleClick = (): void => {
//   if (bodegaOrigen === bodegaDestino) {
//     setTimeout(() => {
//       setMessage('')
//       setError('')
//     }, 4000)
//     setError('Debe Ingresar Una Bodega De Origen y Una De Destino Diferentes !!!'); return
//   }
//   axios.post('/moveSimcard', {
//     bodegas: { bodegaOrigen: bodegaOrigen._id, bodegaDestino: bodegaDestino._id },
//     simsIds: { entran: cartSims, salen: cartSims2 },
//     encargado: nombres,
//     descripcion,
//     incidente,
//     company
//   })
//     .then(res => {
//       setMessage(res.data.message as string)
//       setBodegaOrigen({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' })
//       setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' })
//       setCartSims([]); setCartSims2([]); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)
//     })
//     .catch(err => {
//       setError(err.response.data.error as string)
//       setTimeout(() => { setMessage(''); setError('') }, 4000)
//     })
// }
