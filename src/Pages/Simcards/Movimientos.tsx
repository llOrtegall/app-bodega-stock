import { RenderBodegaDestino } from '../../components/simcards/RenderBodegaDestino.js'
import { RenderBodegaOrigen } from '../../components/simcards/RenderBodegaOrigen.js'
import { ComponenteSimcards } from '../../components/simcards/ComponenteSimcards.js'
import { FooterMovSim } from '../../components/simcards/FooterCompSimcaMov.js'
import { MessageDisplay } from '../../components/ui/MessagesDisplay.js'
import { BodegaWithSims } from '../../types/Simcard.interfaces.js'
import { useAuth } from '../../Auth/AuthContext'
import { useCallback, useState } from 'react'
import axios from 'axios'

function useCarSimcards(initialItems = [] as string[]) {
  const [cartSims, setCartSims] = useState(initialItems)

  const handleAddSimcard = useCallback((id: string) => {
    setCartSims(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setCartSims(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return { cartSims, handleAddSimcard, handleRemoveItem, setCartSims }
}

function useCarSimcards2(initialItems = [] as string[]) {
  const [cartSims2, setCartSims2] = useState(initialItems)

  const handleAddSimcard2 = useCallback((id: string) => {
    setCartSims2(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem2 = useCallback((id: string) => {
    setCartSims2(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return { cartSims2, handleAddSimcard2, handleRemoveItem2, setCartSims2 }
}


export function CreaMovimientosSim() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithSims>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' })
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithSims>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' })

  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { cartSims, setCartSims, handleAddSimcard, handleRemoveItem } = useCarSimcards()
  const { cartSims2, setCartSims2, handleAddSimcard2, handleRemoveItem2 } = useCarSimcards2()

  const hadlesearchnew = () => {
    setCartSims([])
    setCartSims2([])
  }

  const handleClick = () => {
    if (!bodegaOrigen || !bodegaDestino) {
      setTimeout(() => {
        setMessage('')
        setError('')
      }, 4000)
      return setError('Debe Ingresar Una Bodega De Origen y Una De Destino')
    }
    axios.post('/moveSimcard', {
      bodegas: { bodegaOrigen: bodegaOrigen._id, bodegaDestino: bodegaDestino._id },
      simsIds: { entran: cartSims, salen: cartSims2 },
      encargado: nombres,
      descripcion,
      incidente,
      company
    })
      .then(res => {
        setMessage(res.data.message);
        setBodegaOrigen({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' });
        setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' });
        setCartSims([]); setCartSims2([]); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => { setMessage(''); setError('') }, 4000)
      })
  }

  const nombres = user?.nombres + ' ' + user?.apellidos

  return (
    <main className="w-full min-h-[92vh] ">

      <section className="grid grid-cols-4 p-2 gap-2">

        <RenderBodegaOrigen bodegaOrigen={bodegaOrigen} setBodegaOrigen={setBodegaOrigen}
          cartSims={cartSims} handleAddSimcard={handleAddSimcard} fun={hadlesearchnew} company={company} />

        <RenderBodegaDestino bodegaDestino={bodegaDestino} setBodegaDestino={setBodegaDestino}
          cartSims2={cartSims2} handleAddSimcard2={handleAddSimcard2} fun={hadlesearchnew} company={company} />
      </section>

      <article className='mx-2 rounded-md'>

        <ComponenteSimcards bodegaOrigen={bodegaOrigen} bodegaDestino={bodegaDestino} cartSims={cartSims}
          cartSims2={cartSims2} handleRemoveItem={handleRemoveItem} handleRemoveItem2={handleRemoveItem2} />
      </article>

      <section>

        <FooterMovSim encargado={nombres} incidente={incidente} setIncidente={setIncidente}
          descripcion={descripcion} setDescripcion={setDescripcion} handleClick={handleClick} />
      </section>

      <section className='pt-4'>

        <MessageDisplay message={message} error={error} />
      </section>
    </main>
  )
}
