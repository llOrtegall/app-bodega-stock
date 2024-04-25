import { getItem, sendUpdateItem } from '../../services/Item.services'
import { Button, Label, MessageDisplay } from '../../components/ui'
import { useLocation, useNavigate } from 'react-router-dom'
import {OPTION_ITEMS_CREATED_AND_UPDATE } from './index'
import { type updateItem } from '../../types/Item'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'

export function DetalleItem (): JSX.Element {
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { id } = useLocation().state as { id: string }
  const navigate = useNavigate()
  const { user } = useAuth()
  const company = user.empresa

  const initialItem: updateItem = {
    _id: '',
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: 'Bueno',
    company
  }

  const [item, setItem] = useState<updateItem>(initialItem)

  useEffect(() => {
    getItem(company, id)
      .then(res => { setItem(res) })
      .catch(err => {
        console.log(err)
      })
  }, [company, id])

  const handleChange = (event: { target: { name: string, value: string } }): void => {
    const { name, value } = event.target
    setItem(prevItem => ({ ...prevItem, [name]: value }))
  }

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault()
    const sendItem = { ...item, id: item._id, company }
    void sendUpdateItem(sendItem)
      .then(res => {
        setMessage(res.message)
        setItem(initialItem)
        setTimeout(() => { navigate('/items/verItems') }, 3000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
      })
  }

  return (
    <section className='  flex flex-col p-4 w-full items-center'>
      <h1 className='text-center text-2xl font-semibold pb-8 dark:text-white'>Detalle De Item </h1>

      <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-4 pb-10 p-8 rounded-md bg-blue-300 dark:bg-blue-900'>
        <div className='flex flex-col w-96 gap-2'>
          <Label>Nombre:</Label>
          <select name="nombre" value={item.nombre} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Seleccionar Un Item</option>
            {OPTION_ITEMS_CREATED_AND_UPDATE.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Label>Descripción / Marca :</Label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="descripcion" value={item.descripcion} onChange={handleChange} />
          <Label>Placa:</Label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="placa" value={item.placa} onChange={handleChange} />
        </div>

        <div className='flex flex-col w-96 gap-2'>
          <Label>Serial / N° Referencia:</Label>
          <input className='p-2 rounded-md border border-gray-300'
            type="text" name="serial" value={item.serial} onChange={handleChange} />
          <Label>Estado:</Label>
          <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
            <option value="">Selecciona un estado</option>
            <option value="Nuevo">Nuevo</option>
            <option value="Bueno">Bueno</option>
            <option value="Malo">Malo</option>
            <option value="Baja">Baja</option>
          </select>
          <Label>Acciones:</Label>

          <Button>Actualizar</Button>

        </div>
      </form>

      <MessageDisplay message={message} error={error} />
    </section>
  )
}
