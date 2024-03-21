import { BodegaDataSims, simcardsBodegas } from '../../services/Simcards.services'
import { type SimcardWithBodega } from '../../types/Simcard.interfaces'
import { useFilterSimcards, useFiltersBodegas } from '../../hooks'
import { useCallback, useEffect, useState } from 'react'
import { Loading, MessageDisplay } from '../../components/ui'
import { type Bodegas } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import { FilterComponentSimcars } from '../../components/ui/FilterComponentSimcars'
import { ListItemsComponent } from '../../components/simcards/ListSimcardsComponent'

export function AsignarSimcards(): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa

  const [simConBodega, setSimConBodega] = useState<SimcardWithBodega[]>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simConBodega)
  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  const [sendBodega, setSendBodega] = useState('')

  useEffect(() => {
    void simcardsBodegas(company)
      .then(data => {
        setSimConBodega(data)
      })
      .catch(err => {
        const errorString = err.response.data.error
        if (typeof errorString === 'string') setError(errorString)
      })

    setTimeout(() => {
      void BodegaDataSims(company)
        .then(data => {
          setBodegas(data)
        })
        .catch(err => { setError(err.response.data.error as string) }
        )
    }, 1000)
  }, [message])

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    try {
      const res = await axios.post('/addSimcardToBodega',
        { sucursal: sendBodega, simcardIds: cartSims, company }
      )
      setMessage(res.data.message as string)
      setSimConBodega([])
      setBodegas([])
      setSendBodega('')
      setSearchSimcard('')
      setSearchBodega('')
      setCartSims([])
      setTimeout(() => {
        setMessage('')
      }, 3000)
    } catch (err) {
      console.log(err)
      setError('Ocurrio Un Error Inesperado')
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const [cartSims, setCartSims] = useState<string[]>([])

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

  return (
    <main className='border'>
      <h2 className='bg-blue-800 text-white py-4 text-2xl font-semibold text-center'>Asignar Simcards a Bodega</h2>

      <section className='grid grid-cols-3 gap-3 px-4'>

        <section>
          <h3 className="text-center font-semibold border-b-2 border-black pb-1">Items Sin Bodega</h3>
          <header>
            <div className='flex w-full justify-center py-2'>
              <FilterComponentSimcars searchSimcard={searchSimcard} setSearchSimcard={setSearchSimcard}/>
            </div>
            <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-blue-200'>
              <span>Numero</span>
              <span>Serial</span>
              <span>Agregar</span>
            </p>
          </header>

          <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {
              filteredSimcards.length > 0
                ? (<ListItemsComponent cartSims={cartSims} simcards={filteredSimcards} handleAddItem={handleAddSimcard} />)
                : <Loading>Cargando Items Sin Bodega...</Loading>
            }
          </main>
        </section>

      </section>

    </main>
  )
}

// <main className="w-full h-[93vh] flex justify-around">

// <article className="w-[550px]">

//   <section className='flex items-center gap-4 py-6'>
//     <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Operador | Serial | Número</p>
//     <input type="text" placeholder="Buscar simcards..."
//       value={searchSimcard} onChange={ev => { setSearchSimcard(ev.target.value) }}
//       className="bg-slate-200 w-64 p-2 rounded-md" />
//   </section>

//   <h2 className='text-xl font-semibold text-center pb-4'>Simcards Sin Asignar a Bodegas: </h2>
//   <section
//     className="bg-slate-200 rounded-md shadow-lg p-2 min-w-96 flex flex-col gap-2 mb-4" style={{ maxHeight: '250px', overflowY: 'auto' }}>
//     {
//       filteredSimcards.map(item => (
//         item.bodega === 'No Asignado' && (
//           <article key={item._id} className='grid grid-cols-7 bg-slate-300 px-2 py-1 rounded-md hover:bg-blue-200'>
//             <p className='col-span-2'>{item.serial.slice(-7)}</p>
//             <p className='col-span-1 text-center'>{item.operador}</p>
//             <p className='col-span-3 overflow-ellipsis text-center overflow-hidden'>{item.numero}</p>
//             <button
//               onClick={() => { handleAddSimcard(item._id) }}
//               className={cartSims.includes(item._id) ? 'added col-span-1 w-6' : 'hover:bg-green-300 hover:rounded-full col-span-1 w-6'}
//             >
//               <AddIcon />
//             </button>
//           </article>
//         )
//       ))
//     }
//   </section>

//   <h2 className='text-xl font-semibold text-center'>Simcards Seleccionadas Para Asignación: </h2>
//   <section style={{ maxHeight: '350px', overflowY: 'auto' }} className='bg-slate-200 rounded-md shadow-lg p-2 min-w-96 flex flex-col gap-2'>
//     {
//       // eslint-disable-next-line array-callback-return
//       cartSims.map(id => {
//         const sim = simConBodega.find(sim => sim._id === id);
//         if (sim != null) {
//           return (
//             <article key={id} className='grid grid-cols-7 bg-slate-300 px-2 py-1 rounded-md hover:bg-red-200'>
//               <p className='col-span-2'>{sim.serial.slice(-7)}</p>
//               <p className='col-span-1 text-center'>{sim.operador}</p>
//               <p className='col-span-3 overflow-ellipsis text-center overflow-hidden'>{sim.numero}</p>
//               <button
//                 onClick={() => { handleRemoveItem(id) }}
//                 className='hover:bg-red-300 hover:rounded-full col-span-1 w-6'
//               >
//                 <DeleteIcon />
//               </button>
//             </article>
//           )
//         }
//       })
//     }
//   </section>
// </article>

// <article className="w-[550px]">

//   <section className='flex items-center gap-4 py-6'>
//     <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre | Dirección </p>
//     <input type="text" placeholder="Buscar bodega..."
//       value={searchBodega} onChange={ev => { setSearchBodega(ev.target.value) }}
//       className="bg-slate-200 w-64 p-2 rounded-md" />
//   </section>

//   <select className="bg-slate-200 rounded-md shadow-lg p-2 w-full flex flex-col gap-2 mb-4"
//     value={sendBodega} onChange={ev => { setSendBodega(ev.target.value) }}
//     name="sucursal" id="sucursal">
//     <option value="">Seleccione una bodega</option>
//     {
//       filteredBodegas.map(bodega => (
//         <option key={bodega._id} value={bodega.sucursal} className='justify-normal'>
//           {bodega.sucursal} | {bodega.nombre}
//         </option>
//       ))
//     }
//   </select>

//   <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mb-4">
//     <button className="w-60 h-10 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold">
//       Asignar
//     </button>
//   </form>

//   <MessageDisplay message={message} error={error} />
// </article>
// </main>
