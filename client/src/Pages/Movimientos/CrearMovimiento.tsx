import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
import { type BodegaWithItems } from '../../types/Bodega'
import { Button, Input, Label, MessageDisplay } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useCallback, useState } from 'react'
import axios from 'axios'

export function CrearMovimiento(): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa
  const nombres = user?.nombres + ' ' + user?.apellidos

  // Estado para traer bodega de origen
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaWithItems>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' })
  const [bodegaDestino, setBodegaDestino] = useState<BodegaWithItems>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' })

  const [searchBodegaOrigen, setSearchBodegaOrigen] = useState('')
  const [searchBodegaDestino, setSearchBodegaDestino] = useState('')

  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')

  const [cartItems, setCartItems] = useState<string[]>([])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const getBodOrigen = (ev: { preventDefault: () => void }): void => {
    ev.preventDefault()
    setMessage('Buscando Bodega ...')
    axios.get(`/getBodega/${company}/${searchBodegaOrigen}`)
      .then(response => {
        setMessage('')
        setBodegaOrigen(response.data as BodegaWithItems)
      })
      .catch(error => {
        setMessage('')
        setError(error.response.data.error as string)
        console.log(error)
      })
  }

  const getBodDestino = (ev: { preventDefault: () => void }): void => {
    ev.preventDefault()
    setMessage('Buscando Bodega ...')
    axios.get(`/getBodega/${company}/${searchBodegaDestino}`)
      .then(response => {
        setMessage('')
        setBodegaDestino(response.data as BodegaWithItems)
      })
      .catch(error => {
        setMessage('')
        setError(error.response.data.error as string)
        console.log(error)
      })
  }

  const handleClick = (): void => {
    axios.post('/moveItem', {
      bodegaOrigen: bodegaOrigen._id,
      bodegaDestino: bodegaDestino._id,
      itemsIds: cartItems,
      encargado: nombres,
      descripcion,
      incidente,
      company
    })
      .then(res => {
        setMessage(res.data.message as string)
        // resetea los estados
        setBodegaOrigen({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' })
        setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], created_at: '', updated_at: '' })
        setCartItems([])
        setDescripcion('')
        setIncidente('')
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
  }

  const handleAddItem = useCallback((id: string) => {
    setCartItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setCartItems(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  return (
    <main className="min-h-[92vh] pt-2">

      <section className='flex gap-2 px-2'>

        <section className='w-6/12'>

          <HeaderBodega funGetBodega={getBodOrigen} valueBodega={searchBodegaOrigen} searBodega={setSearchBodegaOrigen} bodega={bodegaOrigen} >
            Bodega Origen
          </HeaderBodega>

          <section style={{ maxHeight: '430px', overflowY: 'auto' }} className='mb-2'>
            {
              bodegaOrigen.items.map(item => (
                typeof item !== 'string' && (
                  <section key={item._id} className="flex justify-between py-1 my-1 border rounded-md text-xs 2xl:text-base dark:text-white">
                    <p className='w-3/12 text-center font-semibold'>{item.nombre}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.placa}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.serial}</p>
                    <button className='w-1/12 text-center hover:text-green-400  flex justify-center'
                      onClick={() => { handleAddItem(item._id) }} >
                      {
                        cartItems.includes(item._id)
                          ? <p className="bg-green-300 rounded-full text-black"><CheckIcon /></p>
                          : <p className=""><AddIcon /></p>
                      }
                    </button>
                  </section>
                )
              ))
            }
          </section>

        </section>

        <section className='w-6/12'>

          <HeaderBodega funGetBodega={getBodDestino} valueBodega={searchBodegaDestino} searBodega={setSearchBodegaDestino} bodega={bodegaDestino}>
            Bodega Destino
          </HeaderBodega>

          {
            cartItems.map(itemAdd => (
              <article key={itemAdd} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2 dark:text-white'>
                <p className=''>
                  {bodegaOrigen.items.find(i => i._id === itemAdd)?.placa}
                </p>
                <p className=''>
                  {bodegaOrigen.items.find(i => i._id === itemAdd)?.nombre}
                </p>
                <button onClick={() => { handleRemoveItem(itemAdd) }} className="hover:text-red-600">
                  <DeleteIcon />
                </button>
              </article>
            ))
          }

        </section>

      </section>


      <form className="flex flex-col py-4 px-2 bg-slate-300 dark:bg-dark-tremor-brand-muted dark:text-white rounded-md mx-2">
        <div className='flex items-center justify-center gap-4'>
          <Label>Encargado:</Label>
          <Input type="text" value={nombres} readOnly placeholder="Pepito Perez Muñoz" />

          <Label>N° Incidente:</Label>
          <Input type="text" value={incidente} onChange={ev => { setIncidente(ev.target.value) }} placeholder="134564 | 234252 | 634532" />

        </div>
        <Label>Observaciones:</Label>
        <Input type="text" value={descripcion} onChange={ev => { setDescripcion(ev.target.value) }} placeholder="texto para registrar observación ..." />
      </form>

      <section className="w-full flex items-center justify-center mt-4">
        <div>
          <Button onClick={handleClick}>
            Realizar Movimiento
          </Button>
        </div>
      </section>

      <section className='flex justify-center pt-2'>
        <MessageDisplay message={message} error={error} />
      </section>
    </main>
  )
}
