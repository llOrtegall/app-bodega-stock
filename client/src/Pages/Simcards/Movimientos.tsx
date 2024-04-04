import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { BodegaWithSims, SimcardNoBodega } from '../../types/Simcard.interfaces'
import { RenderSimcard } from '../../components/simcards/RenderSimcard'
import { RenderBodega } from '../../components/simcards/RenderBodega'
import { SortableContext } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import axios from 'axios'

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, simcards: [], items: [], updatedAt: '' }

export function CreaMovimientosSim(): JSX.Element {
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithSims>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithSims>(initialState)

  const [cartSims, setCartSims] = useState<string[]>([])
  const [cartSims2, setCartSims2] = useState<string[]>([])

  // TODO: Esta función se está pasando como prop a los componentes Render bodega pero lo mejor sera llamarlo desde el componente con un servicio
  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<BodegaWithSims> => {
    setCartSims([]); setCartSims2([]);
    const response = await axios.get(`/getBodegaSimcards/${company}/${sucursal}`)
    return response.data as BodegaWithSims
  }

  const bodegasIds = [bodegaOrigen._id, bodegaDestino._id]
  const [SimcardActive, setSimcardActive] = useState<SimcardNoBodega | null>(null)

  function handleDragStart(ev: DragStartEvent) {
    if (ev.active.data.current?.type === 'simcard') {
      setSimcardActive(ev.active.data.current?.simcard)
      return
    }
  }

  function handleDragEnd(ev: DragEndEvent) {
    const { active, over } = ev

    const SimcarActivaId = active.data.current?.bodegaOrigen
    const BodegaOverId = over?.data.current?.bodega._id

    if (SimcarActivaId === BodegaOverId) {
      console.log('Mismo lugar');
      return
    }

    const simcarMov = active.id

    //Si la Simcards Estan en Bodega Origen
    const SimInBodOri = bodegaOrigen.simcards.find(i => i._id === simcarMov)
    if (SimInBodOri) {

      setCartSims([...cartSims, SimInBodOri._id])

      setBodegaOrigen(prev => {
        const simcards = prev.simcards.filter(i => i._id !== simcarMov)
        return { ...prev, simcards }
      })

      setBodegaDestino(prev => {
        const simcards = [...prev.simcards, SimInBodOri]
        return { ...prev, simcards }
      })
    }

    //Si la Simcards Estan en Bodega Destino
    const SimInBodDes = bodegaDestino.simcards.find(i => i._id === simcarMov)

    if (SimInBodDes) {
      setCartSims2([...cartSims2, SimInBodDes._id])
      setBodegaDestino(prev => {
        const simcards = prev.simcards.filter(i => i._id !== simcarMov)
        return { ...prev, simcards }
      })

      setBodegaOrigen(prev => {
        const simcards = [...prev.simcards, SimInBodDes]
        return { ...prev, simcards }
      })
    }

  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
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
            {SimcardActive && (<RenderSimcard key={SimcardActive._id} simcard={SimcardActive} />)}
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
//       setBodegaOrigen({ _id: '', nombre: '', direccion: '', sucursal: 0, simcards: [], simcards: [], updatedAt: '' })
//       setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, simcards: [], simcards: [], updatedAt: '' })
//       setCartSims([]); setCartSims2([]); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)
//     })
//     .catch(err => {
//       setError(err.response.data.error as string)
//       setTimeout(() => { setMessage(''); setError('') }, 4000)
//     })
// }
