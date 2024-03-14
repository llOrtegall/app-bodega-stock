import { MessageDisplay } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import { BodegaIntIS } from '../../interfaces/Bodega.Interfaces'
import { AddIcon } from '../../components/icons'

export function CrearMovimiento() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const nombres = user?.nombres + ' ' + user?.apellidos

  // Estado para traer bodega de origen
  const [bodegaDestino, setBodegaDestino] = useState(null)
  // Estado para traer bodega de destino
  const [bodegaOrigen, setBodegaOrigen] = useState<BodegaIntIS>({ _id: '', sucursal: 0, nombre: '', direccion: '', items: [], simcards: [] })

  const [searchBodegaOrigen, setSearchBodegaOrigen] = useState('')
  const [searchBodegaDestino, setSearchBodegaDestino] = useState('')

  const [descripcion, setDescripcion] = useState('')
  const [incidente, setIncidente] = useState('')
  const [items, setItems] = useState([])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')


  const searchOrigen = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    setMessage('Buscando Bodega ...')
    axios.get(`/getBodega/${company}/${searchBodegaOrigen}`)
      .then(response => {
        setMessage('')
        setBodegaOrigen(response.data)
        setItems(response.data.items)
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

  // const itemsMap = () => {
  //   return items.map(item => ({
  //     Id: item._id,
  //     Nombre: item.nombre,
  //     Descripcion: item.descripcion,
  //     Placa: item.placa,
  //     Serial: item.serial,
  //     Estado: item.estado
  //   }))
  // }

  // const ItemsMapp = itemsMap()
  // const { carItems, handleAddItem, handleRemoveItem, setCarItems } = useCarItems()
  // const { search, setSearch, filteredItems } = useFiltersItems(ItemsMapp)

  // const handleClick = () => {
  //   axios.post('/moveItem', {
  //     bodegaOrigen: bodegaOrigen._id,
  //     bodegaDestino: bodegaDestino._id,
  //     itemsIds: carItems,
  //     encargado: nombres,
  //     descripcion,
  //     incidente,
  //     company
  //   })
  //     .then(res => {
  //       setMessage(res.data.message)
  //       // resetea los estados
  //       setBodegaOrigen(null)
  //       setBodegaDestino(null)
  //       setItems([])
  //       setCarItems([])
  //       setDescripcion('')
  //       setIncidente('')
  //       setTimeout(() => {
  //         setMessage('')
  //         setError('')
  //       }, 4000)
  //     })
  //     .catch(err => {
  //       setError(err.response.data.error)
  //       setTimeout(() => {
  //         setMessage('')
  //         setError('')
  //       }, 4000)
  //     })
  // }

  return (
    <main className="w-full min-h-[93vh]">

      <section className="grid grid-cols-3 py-4 w-full gap-4 p-2">

        <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center" onSubmit={searchOrigen}>
          <h3 className="font-semibold text-white">Bodega De Origen</h3>
          <input type="text" value={searchBodegaOrigen} onChange={ev => setSearchBodegaOrigen(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
        </form>

        <form className="w-full p-2 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-1 place-content-center" onSubmit={searchDestino}>
          <h3 className="font-semibold text-white">Bodega De Destino</h3>
          <input type="text" value={searchBodegaDestino} onChange={ev => setSearchBodegaDestino(ev.target.value)}
            placeholder="40001 | 34545"
            className="bg-slate-100 w-64 p-2 rounded-md" />
          <button className="bg-green-600 text-white rounded-md p-2 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
        </form>
      </section>

      <section className="grid grid-cols-3 p-2 gap-6">

        <article className="col-span-2">

          <header className="w-full rounded-md p-2 bg-slate-600 text-white grid grid-cols-3 place-items-center mb-2">
            <h3> <span className="font-bold">Nombre:</span>  {bodegaOrigen?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaOrigen?.direccion}</p>
            <p> <span className="font-bold">Sucursal:</span>  {bodegaOrigen?.sucursal}</p>
          </header>

          {/* <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-slate-600 text-white rounded-md px-4 py-2 mb-2">
            <p><span className="font-semibold pr-2">Filtrar:</span>| Placa | Serial | Nombre |</p>
            <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1 text-black"
              value={search} onChange={ev => setSearch(ev.target.value)} />
          </section>

          <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md mb-2 text-white">
            <p className="font-semibold">Nombre Item</p>
            <p className="font-semibold">Placa</p>
            <p className="font-semibold">Serial</p>
            <p className="font-semibold">Agregar</p>
          </section> */}

          <section style={{ maxHeight: '330px', overflowY: 'auto' }} className='mb-2'>
            {
              bodegaOrigen.items.map(item => (
                typeof item !== 'string' && (
                  <div key={item._id} className="grid grid-cols-4 gap-2 p-2 bg-slate-100 rounded-md">
                  <p>{item.nombre}</p>
                  <p>{item.placa}</p>
                  <p>{item.serial}</p>
                  <button className="bg-green-600 text-white p-2 rounded-md hover:bg-white hover:text-black">
                    <AddIcon />
                  </button>
                </div>
                )
              ))
            }
          </section>
          {/* <footer className="py-4 bg-slate-600 rounded-md text-white">
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
          </section> */}

        </article>
        {/*
        <article className=''>
          <header className='bg-slate-600 mb-2 rounded-md p-3 text-white grid place-content-center'>
            <h3> <span className="font-bold">Nombre:</span>  {bodegaDestino?.nombre}</h3>
            <p> <span className="font-bold">Direccion:</span>  {bodegaDestino?.direccion}</p>
            <p> <span className="font-bold">N° Sucursal:</span>  {bodegaDestino?.sucursal}</p>
          </header>
          <main>
            <h2 className="text-center py-2 font-semibold bg-slate-600 mb-2 rounded-md text-white">Items Que Ingresarán :</h2>
            <section style={{ maxHeight: '450px', overflowY: 'auto' }}>
              {
                carItems && (
                  carItems?.map(item => (
                    <ItemsAgregados id={item} key={item} items={filteredItems} handleRemoveItem={handleRemoveItem} />
                  ))
                )
              }
            </section>

          </main>
        </article>
        */}
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
