import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import { BodegaWithSims, SimcardNoBodega } from '../../types/Simcard.interfaces'
import { FooterMovSim } from '../../components/simcards/FooterCompSimcaMov'
import { RenderSimcard } from '../../components/simcards/RenderSimcard'
import { RenderBodega } from '../../components/simcards/RenderBodega'
import { MessageDisplay } from '../../components/ui'
import { SortableContext } from '@dnd-kit/sortable'
import { useAuth } from '../../Auth/AuthContext'
import { createPortal } from 'react-dom'
import { useState } from 'react'
import axios from 'axios'

const initialState = { _id: '', nombre: '', direccion: '', sucursal: 0, simcards: [], items: [], updatedAt: '' }

export function CreaMovimientosSim(): JSX.Element {
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithSims>(initialState)
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithSims>(initialState)

  const { user } = useAuth()
  const nombres = user?.names + ' ' + user?.lastnames
  const company = user?.company

  const [cartSims, setCartSims] = useState<string[]>([])
  const [cartSims2, setCartSims2] = useState<string[]>([])

  const [descripcion, setDescripcion] = useState<string>('')
  const [incidente, setIncidente] = useState<string>('')

  const [message, setMessage] = useState<string>('')
  const [error, setError] = useState<string>('')

  // TODO: Esta función se está pasando como prop a los componentes Render bodega pero lo mejor sera llamarlo desde el componente con un servicio
  const getBodega = async ({ company, sucursal }: { sucursal: string, company: string }): Promise<BodegaWithSims> => {
    setCartSims([]); setCartSims2([]);
    const response = await axios.get(`/getBodegaSimcards/${company}/${sucursal}`)
    return response.data as BodegaWithSims
  }

  const bodegasIds = [bodegaOrigen?._id, bodegaDestino?._id]
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

    function updateBodega(id: string) {
      if (id === bodegaDestino._id && SimcardActive) {
        if (bodegaDestino !== initialState) {
          console.log('Simcard(En Origen) => Bodega Destino');
          SimcardActive ? setBodegaDestino({ ...bodegaDestino, simcards: [...bodegaDestino.simcards, SimcardActive] }) : null
          setBodegaOrigen({ ...bodegaOrigen, simcards: bodegaOrigen.simcards.filter(sim => sim._id !== SimcardActive?._id) })
          setCartSims([...cartSims, SimcardActive._id])
          return
        } else {
          setError('Debe Seleccionar Una Bodega Destino')
          setTimeout(() => {
            setError('')
          }, 4000)
          return
        }
      }

      if (id === bodegaOrigen._id && SimcardActive) {
        if (bodegaOrigen !== initialState) {
          console.log('Simcard(En Destino)  => Bodega Origen');
          SimcardActive ? setBodegaOrigen({ ...bodegaOrigen, simcards: [...bodegaOrigen.simcards, SimcardActive] }) : null
          setBodegaDestino({ ...bodegaDestino, simcards: bodegaDestino.simcards.filter(sim => sim._id !== SimcardActive?._id) })
          setCartSims2([...cartSims2, SimcardActive._id])
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

  const handleClick = (): void => {
    axios.post('/moveSimcard', {
      bodegas: { bodegaOrigen: bodegaOrigen._id, bodegaDestino: bodegaDestino._id },
      simsIds: { entran: cartSims, salen: cartSims2 },
      encargado: nombres,
      descripcion,
      incidente,
      company
    })
      .then(res => {
        setMessage(res.data.message as string)
        setBodegaOrigen(initialState)
        setBodegaDestino(initialState)
        setCartSims([]); setCartSims2([]); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)

      })
      .catch(err => {
        setError(err.response.data.error as string)
        setTimeout(() => { setMessage(''); setError('') }, 4000)
      })
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className="flex gap-1 m-1">
        <SortableContext items={bodegasIds}>
          <RenderBodega title={'Bodega Origen'} fun={getBodega}
            sendBodega={setBodegaOrigen} renderInfo={bodegaOrigen} cart={cartSims2} />
          <RenderBodega title={'Bodega Destino'} fun={getBodega}
            sendBodega={setBodegaDestino} renderInfo={bodegaDestino} cart={cartSims} />
        </SortableContext>
      </main>

      <FooterMovSim encargado={nombres} incidente={incidente} setIncidente={setIncidente}
        descripcion={descripcion} setDescripcion={setDescripcion} handleClick={handleClick} />

      <section className='flex items-center justify-center w-full'>
        <MessageDisplay error={error} message={message} />
      </section>
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

