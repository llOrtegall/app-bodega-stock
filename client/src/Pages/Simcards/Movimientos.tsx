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
    // console.log(SimcardActive);

    function updateBodega(id: string) {
      if (id === bodegaDestino._id && SimcardActive) {
        console.log('Simcard(En Origen) => Bodega Destino');
        SimcardActive ? setBodegaDestino({ ...bodegaDestino, simcards: [...bodegaDestino.simcards, SimcardActive]}) : null
        setBodegaOrigen({ ...bodegaOrigen, simcards: bodegaOrigen.simcards.filter(sim => sim._id !== SimcardActive?._id)})
        setCartSims([...cartSims, SimcardActive._id])
        return
      }

      if (id === bodegaOrigen._id && SimcardActive) {
        console.log('Simcard(En Destino)  => Bodega Origen');
        SimcardActive ? setBodegaOrigen({ ...bodegaOrigen, simcards: [...bodegaOrigen.simcards, SimcardActive]}) : null
        setBodegaDestino({ ...bodegaDestino, simcards: bodegaDestino.simcards.filter(sim => sim._id !== SimcardActive?._id)})
        setCartSims2([...cartSims2, SimcardActive._id])
        return
      }
    }

  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className="flex gap-2 mx-2 mt-2">
        <SortableContext items={bodegasIds}>
          <RenderBodega title={'Bodega Origen'} fun={getBodega} sendBodega={setBodegaOrigen} renderInfo={bodegaOrigen} cart={cartSims2}/>
          <RenderBodega title={'Bodega Destino'} fun={getBodega} sendBodega={setBodegaDestino} renderInfo={bodegaDestino} cart={cartSims}/>
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
