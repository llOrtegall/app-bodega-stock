import { Button, Label, MessageDisplay, Input } from '../../components/ui'
import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Auth/AuthContext'

export function CrearSimcard(): JSX.Element {
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
      <h2 className='bg-blue-200 dark:bg-blue-900 dark:text-white text-3xl py-4 w-full text-center font-semibold'>Creación De Simcard </h2>
      <form className='grid grid-cols-2 place-items-center py-4 gap-3 rounded-md mb-2 bg-slate-300 dark:bg-dark-tremor-brand-muted' onSubmit={handleSubmit}>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="numero">Numero</Label>
          <Input type="text" name="numero" id="numero" placeholder='32021545652 | 3004567890'
            value={simcard.numero} onChange={(e) => { setSimcard({ ...simcard, numero: e.target.value }) }} />
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="operador">Operador</Label>
          <select className='text-black border-none rounded-md cursor-pointer text-center' name="operador" id="operador"
            value={simcard.operador} onChange={(e) => { setSimcard({ ...simcard, operador: e.target.value }) }}>
            <option value="">Selecciona un operador</option>
            <option value="Claro">Claro</option>
            <option value="Movistar">Movistar</option>
            <option value="Tigo">Tigo</option>
          </select>
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="estado">Estado</Label>
          <select className='text-black border-none rounded-md cursor-pointer text-center' name="estado" id="estado"
            value={simcard.estado} onChange={(e) => { setSimcard({ ...simcard, estado: e.target.value }) }}>
            <option value="">Selecciona un estado</option>
            <option value="Activa">Activa</option>
            <option value="Inactiva">Inactiva</option>
            <option value="Reposición">Reposición</option>
            <option value="DeBaja">DeBaja</option>
          </select>
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="serial">Serial</Label>
          <Input type="text" name="serial" id="serial" placeholder='57455432264940023132'
            value={simcard.serial} onChange={(e) => { setSimcard({ ...simcard, serial: e.target.value }) }} />
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="apn">APN</Label>
          <Input type="text" name="apn" id="apn" placeholder='claro.apn.com | movistar.apn.com | tigo.apn.com'
            value={simcard.apn} onChange={(e) => { setSimcard({ ...simcard, apn: e.target.value }) }} />
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="user">User</Label>
          <Input type="text" name="user" id="user" placeholder='CD_320324112 | estrategias'
            value={simcard.user} onChange={(e) => { setSimcard({ ...simcard, user: e.target.value }) }} />
        </div>
        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label htmlFor="pass">Contraseña</Label>
          <Input type="text" name="pass" id="pass" placeholder='13242 | comcelweb | estrategias ...'
            value={simcard.pass} onChange={(e) => { setSimcard({ ...simcard, pass: e.target.value }) }} />
        </div>

        <div className='w-[340px] flex items-center justify-between dark:text-white'>
          <Label>Acciones:</Label>
          <div className='flex w-full pl-12'>
            <Button type='submit'>Crear Simcard</Button>
          </div>
        </div>

      </form>
      <section className=' justify-center pt-2'>
        <MessageDisplay message={message} error={error} />
      </section>

    </main>

  )
}
