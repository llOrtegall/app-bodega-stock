// import { ComponenteSimcards } from '../../components/ComponenteSimcards.jsx'
// import { RenderBodegaOrigen } from '../../components/RenderBodegaOrigen.jsx'
// import { RenderBodegaDestino } from '../../components/RenderBodegaDestino.jsx'
// import { FooterMovSim } from '../../components/FooterCompSimcaMov.jsx'

// import { useCarSimcards, useCarSimcards2 } from '../../hooks/useCartItems.js'
// import { MessageDisplay } from '../../components/MessageDisplay.jsx'
// import { useState } from 'react'
// import axios from 'axios'

// export function CreaMovimientosSim ({ user, company }) {
//   const [bodegaDestino, setBodegaDestino] = useState(null)
//   const [bodegaOrigen, setBodegaOrigen] = useState(null)

//   const [descripcion, setDescripcion] = useState('')
//   const [incidente, setIncidente] = useState('')

//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   const { cartSims, setCartSims, handleAddSimcard, handleRemoveItem } = useCarSimcards()
//   const { cartSims2, setCartSims2, handleAddSimcard2, handleRemoveItem2 } = useCarSimcards2()

//   const hadlesearchnew = () => {
//     setCartSims([])
//     setCartSims2([])
//   }

//   const handleClick = () => {
//     if (!bodegaOrigen || !bodegaDestino) {
//       setTimeout(() => {
//         setMessage('')
//         setError('')
//       }, 4000)
//       return setError('Debe Ingresar Una Bodega De Origen y Una De Destino')
//     }
//     axios.post('/moveSimcard', {
//       bodegas: { bodegaOrigen: bodegaOrigen._id, bodegaDestino: bodegaDestino._id },
//       simsIds: { entran: cartSims, salen: cartSims2 },
//       encargado: nombres,
//       descripcion,
//       incidente,
//       company
//     })
//       .then(res => {
//         setMessage(res.data.message); setBodegaOrigen(null); setBodegaDestino(null); setCartSims([])
//         setCartSims2([]); setDescripcion(''); setIncidente(''); setTimeout(() => { setMessage(''); setError('') }, 4000)
//       })
//       .catch(err => {
//         setError(err.response.data.error)
//         setTimeout(() => { setMessage(''); setError('') }, 4000)
//       })
//   }

//   const nombres = user.nombres + ' ' + user.apellidos

//   return (
//     <main className="w-full min-h-[93vh] ">

//       <section className="grid grid-cols-4 p-2 gap-2">
//         {/* //*: Renderizado Bodega Origen */}
//         <RenderBodegaOrigen bodegaOrigen={bodegaOrigen} setBodegaOrigen={setBodegaOrigen} cartSims={cartSims} handleAddSimcard={handleAddSimcard} fun={hadlesearchnew} company={company}/>
//         {/* //*: Renderizado Bodega Destino */}
//         <RenderBodegaDestino bodegaDestino={bodegaDestino} setBodegaDestino={setBodegaDestino} cartSims2={cartSims2} handleAddSimcard2={handleAddSimcard2} fun={hadlesearchnew} company={company}/>
//       </section>

//       <article className='mx-2 rounded-md'>
//         {/* //* Renderizado Movimiento */}
//         <ComponenteSimcards bodegaOrigen={bodegaOrigen} bodegaDestino={bodegaDestino} cartSims={cartSims}
//           cartSims2={cartSims2} handleRemoveItem={handleRemoveItem} handleRemoveItem2={handleRemoveItem2} />
//       </article>

//       <section>
//         {/* //* Renderizado Footer */}
//         <FooterMovSim encargado={nombres} incidente={incidente} setIncidente={setIncidente}
//           descripcion={descripcion} setDescripcion={setDescripcion} handleClick={handleClick} />
//       </section>

//       <section className='pt-4'>
//         {/* //* Renderizado Mensajes Envio o Error */}
//         <MessageDisplay message={message} error={error} />
//       </section>
//     </main>
//   )
// }
