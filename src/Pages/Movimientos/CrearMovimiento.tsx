import { AddIcon, DeleteIcon } from '../../components/icons'
import { MessageDisplay } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useCallback, useState } from 'react'
import axios from 'axios'
import { Bodega } from '../../interfaces/Movimientos.interfaces'

export function CrearMovimiento() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const nombres = user?.nombres + ' ' + user?.apellidos

  // Estado para traer bodega de origen
  const [bodegaDestino, setBodegaDestino] = useState<Bodega>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [] })
  const [bodegaOrigen, setBodegaOrigen] = useState<Bodega>({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [] })

  const [searchBodegaOrigen, setSearchBodegaOrigen] = useState('')
  const [searchBodegaDestino, setSearchBodegaDestino] = useState('')

  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')

  const [cartitems, setCartItems] = useState<string[]>([])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const searchOrigen = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    setMessage('Buscando Bodega ...')
    axios.get(`/getBodega/${company}/${searchBodegaOrigen}`)
      .then(response => {
        setMessage('')
        setBodegaOrigen(response.data)
      })
      .catch(error => {
        setMessage('')
        setError(error.response.data.error)
        console.log(error)
      })
  }

  const searchDestino = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    setMessage('Buscando Bodega ...')
    axios.get(`/getBodega/${company}/${searchBodegaDestino}`)
      .then(response => {
        setMessage('')
        setBodegaDestino(response.data)
      })
      .catch(error => {
        setMessage('')
        setError(error.response.data.error)
        console.log(error)
      })
  }

  const handleClick = () => {
    axios.post('/moveItem', {
      bodegaOrigen: bodegaOrigen._id,
      bodegaDestino: bodegaDestino._id,
      itemsIds: cartitems,
      encargado: nombres,
      descripcion,
      incidente,
      company
    })
      .then(res => {
        setMessage(res.data.message)
        // resetea los estados
        setBodegaOrigen({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [] })
        setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [] })
        setCartItems([])
        setDescripcion('')
        setIncidente('')
        setTimeout(() => {
          setMessage('')
          setError('')
        }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error)
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

      <section className='flex w-full px-2 gap-2'>

        <section className='w-8/12'>

          <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={searchOrigen}>
            <h3 className="font-semibold text-white">Bodega De Origen</h3>
            <input type="text" value={searchBodegaOrigen} onChange={ev => setSearchBodegaOrigen(ev.target.value)}
              placeholder="40001 | 34545"
              className="bg-slate-100 w-64 p-2 rounded-md" />
            <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
          </form>

          <header className="w-full flex justify-around p-2 border rounded-md bg-blue-300">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
            <p> <span className="font-bold">UUID:</span>  {bodegaOrigen?._id}</p>
          </header>

          <section style={{ maxHeight: '330px', overflowY: 'auto' }} className='mb-2'>
            {
              bodegaOrigen.items.map(item => (
                typeof item !== 'string' && (
                  <section key={item._id} className="flex justify-between py-1 my-1 border rounded-md">
                    <p className='w-3/12 text-center font-semibold'>{item.nombre}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.placa}</p>
                    <p className='w-4/12 text-center font-semibold'>{item.serial}</p>
                    <button className='w-1/12 text-center hover:text-green-400  flex justify-center'
                      onClick={() => handleAddItem(item._id)} >
                      <AddIcon />
                    </button>
                  </section>
                )
              ))
            }
          </section>

          <footer className="py-4 bg-slate-600 rounded-md text-white">
            <form className="grid grid-cols-2 gap-3">
              <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
                <input type="text" className="w-full p-2 rounded-md col-span-1 bg-green-300 no-underline text-black"
                  value={nombres} readOnly
                  placeholder="Pepito Perez Muñoz" />
              </label>

              <label className="flex h-10 items-center"> <span className="font-semibold w-32">N° Incidente:</span>
                <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
                  value={incidente}
                  onChange={ev => setIncidente(ev.target.value)}
                  placeholder="134564 | 234252 | 634532" />
              </label>

              <label className="col-span-3 mx-3"> <span className="font-semibold w-40">Observaciones:</span>
                <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black "
                  value={descripcion}
                  onChange={ev => setDescripcion(ev.target.value)}
                  placeholder="texto para registrar observación ..." />
              </label>
            </form>
          </footer>

          <section className="flex w-full justify-center mt-4">
            <button className="p-2 text-white font-bold w-48 bg-green-600 rounded-md hover:bg-white  hover:text-black" onClick={handleClick}>
              Realizar Movimiento
            </button>
          </section>

        </section>
        <section className='w-4/12'>
          <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-1 place-content-center" onSubmit={searchDestino}>
            <h3 className="font-semibold text-white">Bodega De Destino</h3>
            <input type="text" value={searchBodegaDestino} onChange={ev => setSearchBodegaDestino(ev.target.value)}
              placeholder="40001 | 34545"
              className="bg-slate-100 w-64 p-2 rounded-md" />
            <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
          </form>
          {
            cartitems.map(itemAdd => (
              <article key={itemAdd} className='flex'>
                <p className=''>
                  {bodegaOrigen.items?.find(i => i._id === itemAdd)?.placa}
                </p>
                <p className=''>
                  {bodegaOrigen.items?.find(i => i._id === itemAdd)?.nombre}
                </p>
                <button onClick={() => handleRemoveItem(itemAdd)} className="hover:text-red-600">
                  <DeleteIcon />
                </button>
              </article>
            ))
          }

        </section>

      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
