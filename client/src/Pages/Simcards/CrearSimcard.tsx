import { MessageDisplay } from '../../components/ui'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Auth/AuthContext'

export function CrearSimcard (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa
  const initialState = {
    numero: '',
    operador: '',
    estado: '',
    serial: '',
    apn: '',
    user: '',
    pass: '',
    company
  }
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [simcard, setSimcard] = useState(initialState)

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()

    axios.post('/createSimcard', simcard)
      .then((res) => {
        setMessage(res.data.message as string)
        setSimcard(initialState)
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch((err) => {
        setError(err.response.data.error as string)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <main className='w-full h-[93vh]'>
      <h3 className='text-center text-xl py-2 mx-2 my-1 bg-blue-500 border border-black font-semibold rounded-md'>Creación Simcards</h3>
      <form className='grid grid-cols-2 place-items-center py-4 gap-3 border border-black mx-2 rounded-md mb-2 bg-slate-300' onSubmit={handleSubmit}>
        <div className='flex items-center'>
          <label htmlFor="numero" className='w-28 text-center'>Numero</label>
          <input type="text" name="numero" id="numero" className='p-2 rounded-md min-w-72 outline-none' placeholder='32021545652 | 3004567890'
            value={simcard.numero} onChange={(e) => { setSimcard({ ...simcard, numero: e.target.value }) }} />
        </div>
        <div className='flex items-center'>
          <label htmlFor="operador" className='w-28 text-center'>Operador</label>
          <select name="operador" id="operador" className='p-2 rounded-md min-w-72 outline-none'
            value={simcard.operador} onChange={(e) => { setSimcard({ ...simcard, operador: e.target.value }) }}>
            <option value="">Selecciona un operador</option>
            <option value="Claro">Claro</option>
            <option value="Movistar">Movistar</option>
            <option value="Tigo">Tigo</option>
          </select>
        </div>
        <div className='flex items-center'>
          <label htmlFor="estado" className='w-28 text-center'>Estado</label>
          <select name="estado" id="estado" className='p-2 rounded-md min-w-72 outline-none'
            value={simcard.estado} onChange={(e) => { setSimcard({ ...simcard, estado: e.target.value }) }}>
            <option value="">Selecciona un estado</option>
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
            <option value="Reposición">Reposición</option>
            <option value="DeBaja">DeBaja</option>
          </select>
        </div>
        <div className='flex items-center'>
          <label htmlFor="serial" className='w-28 text-center'>Serial</label>
          <input type="text" name="serial" id="serial" className='p-2 rounded-md min-w-72 outline-none' placeholder='57455432264940023132'
            value={simcard.serial} onChange={(e) => { setSimcard({ ...simcard, serial: e.target.value }) }} />
        </div>
        <div className='flex items-center'>
          <label htmlFor="apn" className='w-28 text-center'>APN</label>
          <input type="text" name="apn" id="apn" className='p-2 rounded-md min-w-72 outline-none' placeholder='claro.apn.com | movistar.apn.com | tigo.apn.com'
            value={simcard.apn} onChange={(e) => { setSimcard({ ...simcard, apn: e.target.value }) }} />
        </div>
        <div className='flex items-center'>
          <label htmlFor="user" className='w-28 text-center'>User</label>
          <input type="text" name="user" id="user" className='p-2 rounded-md min-w-72 outline-none' placeholder='CD_320324112 | estrategias'
            value={simcard.user} onChange={(e) => { setSimcard({ ...simcard, user: e.target.value }) }} />
        </div>
        <div className='flex items-center'>
          <label htmlFor="pass" className='w-28 text-center'>Contraseña</label>
          <input type="text" name="pass" id="pass" className='p-2 rounded-md min-w-72 outline-none' placeholder='13242 | comcelweb | estrategias ...'
            value={simcard.pass} onChange={(e) => { setSimcard({ ...simcard, pass: e.target.value }) }} />
        </div>

        <button type='submit'
          className='bg-blue-600 text-white py-2 px-6 rounded-md font-semibold hover:text-black hover:bg-white min-w-52'>
          Crear Simcard
        </button>

      </form>
      <section className='flex items-center justify-center pt-2'>
        <MessageDisplay message={message} error={error} />
      </section>

    </main>

  )
}
