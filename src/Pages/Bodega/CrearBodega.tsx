import { postBodega } from '../../services/Bodegas.services'
import { SuccesIcon, WarningIcon } from '../../components/icons'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'

export function CrearBodega() {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // nombre, sucursal, direccion
  const [item, setItem] = useState({
    nombre: '',
    sucursal: '',
    direccion: '',
    company
  })

  const handleChange = (e: { target: { name: string; value: string } }) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const itemToSend = {
    ...item,
    sucursal: Number(item.sucursal)
  }

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    const { data, error } = await postBodega(itemToSend)
    if (data) {
      setMessage(data.message)
      console.log(data)
      setItem({
        nombre: '',
        sucursal: '',
        direccion: '',
        company
      }) // limpiar el formulario
      setTimeout(() => {
        setMessage('')
      }, 4000)
    } else if (error) {
      setError(error)
      console.log(error)
      setTimeout(() => {
        setError('')
      }, 4000)
    }
  }
  return (
    <main className="h-[93vh] overflow-auto flex flex-col items-center justify-center pb-20">
      <form className="flex h-auto flex-col items-center p-8 m-8 gap-3 rounded-lg bg-blue-400 w-1/2 " onSubmit={handleSubmit}>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Nombre Bodega | PDV</label>
          <input type="text" name="nombre" value={item.nombre} onChange={handleChange}
            placeholder="Bodega Principal ... | PDV 12 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">N° Sucursal</label>
          <input type="text" name="sucursal" value={item.sucursal} onChange={handleChange} placeholder="401923 | 401924 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>
        <div className="w-full flex flex-col mb-4">
          <label className="mb-2 font-semibold text-gray-700">Dirección</label>
          <input type="text" name="direccion" value={item.direccion} onChange={handleChange}
            placeholder="Cra 4 # 4-56 ... | Calle 5 # 5-67 ..."
            className="px-3 py-2 border border-gray-300 rounded-md" />
        </div>

        <input type="text" value={company} readOnly className='p-2 rounded-md text-center font-semibold'/>

        <button className="text-md p-2 w-44  font-semibold text-white bg-blue-700 rounded-md hover:bg-white hover:text-black">
          Crear Bodega | PDV
        </button>
      </form>
      <footer>
        {message &&
          <div className='flex gap-2'>
            <figure className='bg-green-600 text-white font-bold flex items-center justify-center text-center px-2 rounded-md'>
              <SuccesIcon />
            </figure>
            <p className="text-center bg-green-600 text-white font-semibold p-2 rounded-md">
              {message}
            </p>
          </div>
        }
        {error &&
          <div className='flex gap-2'>
            <figure className='bg-red-400 text-white flex items-center justify-center text-center px-2 rounded-md'>
              <WarningIcon />
            </figure>
            <p className="text-center bg-red-400 text-white font-semibold p-2 rounded-md">
              {error}
            </p>
          </div>
        }
      </footer>
    </main>
  )
}
