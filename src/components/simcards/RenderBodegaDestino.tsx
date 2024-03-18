import axios from 'axios'
import { useState } from 'react'
import { DeleteIcon } from '../icons'
import { useFilterSimcards } from '../../hooks'
import { BodegaWithSims } from '../../types/Simcard.interfaces'

export function RenderBodegaDestino ({ bodegaDestino, setBodegaDestino, cartSims2, handleAddSimcard2, fun, company }:
  {bodegaDestino: BodegaWithSims, setBodegaDestino: React.Dispatch<React.SetStateAction<BodegaWithSims>>, cartSims2: string[], handleAddSimcard2: (id: string) => void, fun: () => void, company: string }) {
  const [searchBodegaDestino, setSearchBodegaDestino] = useState('')

  const hadlesearchnew = fun

  const searchDestino = (ev: { preventDefault: () => void }) => {
    ev.preventDefault()
    if (bodegaDestino !== null) {
      hadlesearchnew()
      setBodegaDestino({ _id: '', nombre: '', direccion: '', sucursal: 0, items: [], simcards: [], updatedAt: '' })
      axios.get(`/getBodegaSimcards/${company}/${searchBodegaDestino}`)
        .then(response => {
          setBodegaDestino(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      axios.get(`/getBodegaSimcards/${company}/${searchBodegaDestino}`)
        .then(response => {
          setBodegaDestino(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  const simCards2 = bodegaDestino?.simcards || []
  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simCards2)

  return (
    <article className="col-span-2 text-md flex flex-col gap-2">

      <form className="w-full p-1 bg-gray-600 rounded-lg flex items-center gap-2 text-center col-span-2 place-content-center "
        onSubmit={searchDestino}>
        <h3 className="font-semibold text-white">Buscar Bodega Destino</h3>
        <input type="text" value={searchBodegaDestino} onChange={ev => setSearchBodegaDestino(ev.target.value)}
          placeholder="40001 | 34545"
          className="bg-slate-100 w-64 p-1 rounded-md " />
        <button className="bg-green-600 text-white rounded-md p-1 font-semibold hover:bg-white hover:text-black">Buscar Sucursal</button>
      </form>

      <header className="w-full flex justify-around rounded-md p-2 bg-slate-600 text-white place-items-center ">
        <h3> <span className='font-bold pr-2'>Nombre:</span>{bodegaDestino?.nombre}</h3>
        <p> <span className='font-bold pr-2'>Direccion:</span>{bodegaDestino?.direccion}</p>
        <p> <span className='font-bold pr-2'>Sucursal:</span>{bodegaDestino?.sucursal}</p>
      </header>

      <section className="grid grid-cols-2 w-full place-items-center gap-6 bg-slate-600 text-white rounded-md px-4 py-2 ">
        <p><span className="font-semibold pr-2">Filtrar:</span>| Número | Serial | Operador |</p>
        <input type="text" placeholder="Buscar Items..." className="bg-slate-100 w-64 rounded-md p-1 text-black"
          value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)} />
      </section>

      <section className="grid grid-cols-4 w-full place-items-center p-2 bg-slate-600 rounded-md  text-white">
        <p className="font-semibold">Número</p>
        <p className="font-semibold">Operador</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">Agregar</p>
      </section>

      <section style={{ maxHeight: '330px', overflowY: 'auto' }} className=''>
        {
          bodegaDestino && (
            filteredSimcards.map(item => (
              <section key={item._id} className="w-full grid grid-cols-4 p-2 bg-blue-500 rounded-md mb-2 place-items-center text-white transition-colors hover:text-black hover:bg-slate-200 cursor-default">
                <p>{item.numero}</p>
                <p>{item.operador}</p>
                <p>{item.serial}</p>
                <button
                  onClick={() => handleAddSimcard2(item._id)}
                  className={cartSims2.includes(item._id) ? 'deleted' : 'rounded-full transition-colors hover:bg-red-300  hover:text-black'}
                >
                  <DeleteIcon
                 />
                </button>
              </section>
            ))
          )
        }
      </section>
    </article>
  )
}
