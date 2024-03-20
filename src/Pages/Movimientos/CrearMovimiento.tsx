import { HeaderBodega } from '../../components/Movimientos/HeaderBodega'
import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
import { type BodegaWithItems } from '../../types/Bodega'
import { MessageDisplay } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useCallback, useState } from 'react'
import axios from 'axios'

export function CrearMovimiento (): JSX.Element {
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
    <main className="w-full min-h-[92vh] pt-2">

      <section className='flex gap-2 px-2'>

        <section className='w-6/12'>

          <HeaderBodega funGetBodega={getBodOrigen} valueBodega={searchBodegaOrigen} searBodega={setSearchBodegaOrigen} bodega={bodegaOrigen} >
            Bodega Origen
          </HeaderBodega>

          <section style={{ maxHeight: '430px', overflowY: 'auto' }} className='mb-2'>
            {
              bodegaOrigen.items.map(item => (
                typeof item !== 'string' && (
                  <section key={item._id} className="flex justify-between py-1 my-1 border rounded-md">
                    <p className='w-3/12 text-center font-semibold'>{item.nombre}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.placa}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.serial}</p>
                    <button className='w-1/12 text-center hover:text-green-400  flex justify-center'
                      onClick={() => { handleAddItem(item._id) }} >
                      {
                        cartItems.includes(item._id)
                          ? <p className="bg-green-300 rounded-full"><CheckIcon /></p>
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
              <article key={itemAdd} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2'>
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

      <footer className="py-4 bg-slate-600 rounded-md text-white mx-2">
        <form className="grid grid-cols-2 gap-3">
          <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
            <input type="text" className="w-full p-2 rounded-md col-span-1 bg-green-300 no-underline text-black"
              value={nombres} readOnly
              placeholder="Pepito Perez Muñoz" />
          </label>

          <label className="flex h-10 items-center"> <span className="font-semibold w-32">N° Incidente:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
              value={incidente}
              onChange={ev => { setIncidente(ev.target.value) }}
              placeholder="134564 | 234252 | 634532" />
          </label>

          <label className="col-span-3 mx-3"> <span className="font-semibold w-40">Observaciones:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black "
              value={descripcion}
              onChange={ev => { setDescripcion(ev.target.value) }}
              placeholder="texto para registrar observación ..." />
          </label>
        </form>
      </footer>

      <section className="flex w-full justify-center mt-4">
        <button className="p-2 text-white font-semibold w-48 bg-green-600 rounded-md hover:bg-white  hover:text-black" onClick={handleClick}>
          Realizar Movimiento
        </button>
      </section>

      <section className='flex items-center justify-center pt-2'>
        <MessageDisplay message={message} error={error} />
      </section>
    </main>
  )
}
