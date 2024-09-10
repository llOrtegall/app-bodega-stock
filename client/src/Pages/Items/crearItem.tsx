import { MessageDisplay } from '../../components/ui/MessagesDisplay'
import { Button, Input, Label, Loading } from '../../components/ui'
import { createItem } from '../../services/Item.services'
import { OPTION_ITEMS_CREATED_AND_UPDATE } from './index'
import { type newItem } from '../../types/Item'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'

export function CrearItems(): JSX.Element {
  const { user } = useAuth()
  const company = user?.company!
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const initialItem: newItem = {
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: 'Bueno',
    company
  }

  const [item, setItem] = useState<newItem>(initialItem)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    setLoading(true)
    void createItem(item)
      .then(res => {
        setLoading(false)
        setMessage(res.message)
        setItem(initialItem)
        setTimeout(() => { setMessage('') }, 5000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
        setTimeout(() => { setError('') }, 5000)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <main className="flex flex-col items-center text-xl">
      <h2 className='bg-blue-200 dark:bg-blue-900 dark:text-white text-3xl py-4 w-full text-center font-semibold mb-20'>Creación Activos / Insumos </h2>

      <form className="grid grid-cols-3 gap-2 rounded-lg place-items-center mb-20 bg-slate-200 dark:bg-dark-tremor-brand-muted dark:text-white px-20 py-12"
        onSubmit={handleSubmit}>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Nombre: </Label>
          <select name="nombre" id="item"
            onChange={handleChange} value={item.nombre}
            className='text-black border rounded-md p-2 border-gray-300'>
            <option value="">Selecciona un item</option>
            {OPTION_ITEMS_CREATED_AND_UPDATE.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
          </select>
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Descripción | Marca</Label>
          <Input type="text" name="descripcion"
            value={item.descripcion} onChange={handleChange} placeholder="Genius - Teclado Gamer ..." />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Placa</Label>
          <Input type="text" name="placa"
            value={item.placa} onChange={handleChange}
            placeholder="MI-0001 / MA-0002 ..."
            required />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Serial</Label>
          <Input type="text" name="serial"
            value={item.serial} onChange={handleChange}
            placeholder="XFGRTWE675 / SN:JSURY6373 ..."
            required />
        </div>

        <div className="w-full flex flex-col py-2 gap-2">
          <Label>Estado</Label>
          <select name="estado" value={item.estado} onChange={handleChange} className="text-black px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Selecciona un estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
            <option value="Baja">Baja</option>
          </select>
        </div>

        <div>
          <Label>Acciones</Label>
          <Button>Crear Item</Button>
        </div>
      </form>

      {loading && (<section>
        <Loading>Creando Item ...</Loading>
      </section>)}
      <MessageDisplay message={message} error={error} />
    </main>
  )
}
