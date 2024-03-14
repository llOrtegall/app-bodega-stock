// import { useFiltersBodegas, useFilterSimcards } from '../../hooks/useFilters.js'
// import { BodegaDataSims, simcardsBodegas } from '../../services/FetchItemsData.js'
// import { MessageDisplay } from '../../components/MessageDisplay.jsx'
// import { ItemsAgregados } from '../../components/ItemsAgregados.jsx'
// import { useCarItems } from '../../hooks/useCartItems.js'
// import { AddIcon } from '../../components/Icons.jsx'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export function AsignarSimcards ({ company }) {
//   const [simConBodega, setSimConBodega] = useState([])
//   const [bodegas, setBodegas] = useState([])

//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simConBodega)
//   const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)
//   const { handleAddItem, handleRemoveItem, carItems, setCarItems } = useCarItems()

//   const [sendBodega, setSendBodega] = useState('')

//   useEffect(() => {
//     simcardsBodegas(company)
//       .then(data => {
//         setSimConBodega(data)
//       })
//       .catch(err => console.log(err))

//     setTimeout(() => {
//       BodegaDataSims(company)
//         .then(data => {
//           setBodegas(data)
//         })
//         .catch(err => console.log(err))
//     }, 1000)
//   }, [message])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       const res = await axios.post('/addSimcardToBodega',
//         { sucursal: sendBodega, simcardIds: carItems, company }
//       )
//       setMessage(res.data.message)
//       setSimConBodega([])
//       setBodegas([])
//       setSendBodega('')
//       setSearchSimcard('')
//       setSearchBodega('')
//       setCarItems([])
//       setTimeout(() => {
//         setMessage('')
//       }, 4000)
//     } catch (err) {
//       console.log(err)
//       setError(err.response?.data?.error || 'An error occurred')
//       setTimeout(() => {
//         setError('')
//       }, 4000)
//     }
//   }

//   const simsMap = () => {
//     return simConBodega.map(item => ({
//       Id: item._id,
//       Numero: item.numero,
//       Descripcion: item.descripcion,
//       Operador: item.operador,
//       Serial: item.serial,
//       Estado: item.estado,
//       Bodega: item.bodega === 'No Asignado' ? 'No Asignado' : item.bodega.nombre
//     }))
//   }

//   return (
//     <main className="w-full h-[93vh] flex justify-around">

//       <article className="w-[550px]">

//         <section className='flex items-center gap-4 py-6'>
//           <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Operador | Serial | Número</p>
//           <input type="text" placeholder="Buscar simcards..."
//             value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)}
//             className="bg-slate-200 w-64 p-2 rounded-md" />
//         </section>

//         <h2 className='text-xl font-semibold text-center pb-4'>Simcards Sin Asignar a Bodegas: </h2>
//         <section name="itemIds"
//           className="bg-slate-200 rounded-md shadow-lg p-2 min-w-96 flex flex-col gap-2 mb-4" style={{ maxHeight: '250px', overflowY: 'auto' }}>
//           {
//             filteredSimcards.map(item => (
//               item.bodega === 'No Asignado' && (
//                 <article key={item._id} value={item._id} className='grid grid-cols-7 bg-slate-300 px-2 py-1 rounded-md hover:bg-blue-200'>
//                   <p className='col-span-2'>{item.serial.slice(-7)}</p>
//                   <p className='col-span-1 text-center'>{item.operador}</p>
//                   <p className='col-span-3 overflow-ellipsis text-center overflow-hidden'>{item.numero}</p>
//                   <button
//                     onClick={() => handleAddItem(item._id)}
//                     className={carItems.includes(item._id) ? 'added col-span-1 w-6' : 'hover:bg-green-300 hover:rounded-full col-span-1 w-6'}
//                   >
//                     <AddIcon />
//                   </button>
//                 </article>
//               )
//             ))
//           }
//         </section>

//         <h2 className='text-xl font-semibold text-center'>Simcards Seleccionadas Para Asignación: </h2>
//         <section style={{ maxHeight: '350px', overflowY: 'auto' }} className='bg-slate-200 rounded-md shadow-lg p-2 min-w-96 flex flex-col gap-2'>
//           {
//             carItems && (
//               carItems?.map(item => (
//                 <ItemsAgregados id={item} key={item} items={simsMap()} handleRemoveItem={handleRemoveItem} />
//               ))
//             )
//           }
//         </section>
//       </article>

//       <article className="w-[550px]">

//         <section className='flex items-center gap-4 py-6'>
//           <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre | Dirección </p>
//           <input type="text" placeholder="Buscar bodega..."
//             value={searchBodega} onChange={ev => setSearchBodega(ev.target.value)}
//             className="bg-slate-200 w-64 p-2 rounded-md" />
//         </section>

//         <select className="bg-slate-200 rounded-md shadow-lg p-2 w-full flex flex-col gap-2 mb-4"
//           value={sendBodega} onChange={ev => setSendBodega(ev.target.value)}
//           name="sucursal" id="sucursal">
//           <option value="">Seleccione una bodega</option>
//           {
//             filteredBodegas.map(bodega => (
//               <option key={bodega._id} value={bodega.sucursal} className='justify-normal'>
//                 {bodega.sucursal} | {bodega.nombre}
//               </option>
//             ))
//           }
//         </select>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center mb-4">
//           <button className="w-60 h-10 bg-blue-400 hover:bg-blue-600 rounded-lg text-white font-semibold">
//             Asignar
//           </button>
//         </form>

//         <MessageDisplay message={message} error={error} />
//       </article>
//     </main>
//   )
// }
