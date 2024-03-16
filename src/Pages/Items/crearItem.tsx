import { MessageDisplay } from '../../components/ui/MessagesDisplay'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'
import axios from 'axios'
import { createItem } from '../../interfaces/Item.Intece'

const options = [
  { value: 'Impresora TMU USB/LPT', label: 'Impresora TMU | USB' },
  { value: 'Impresora Termica', label: 'Impresora Termica USB' },
  { value: 'Monitor / Pantalla', label: 'Monitor' },
  { value: 'Torre', label: 'Torre' },
  { value: 'Teclado', label: 'Teclado' },
  { value: 'Mouse / Raton', label: 'Mouse' },
  { value: 'Cámara', label: 'Cámara' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'PDA V1', label: 'PDA V1' },
  { value: 'PDA V2', label: 'PDA V2' },
  { value: 'CS10', label: 'CS10' },
  { value: 'NVR', label: 'NVR' },
  { value: 'Portátil', label: 'Portátil' },
  { value: 'Lector De Barras', label: 'Lector De Barras' },
  { value: 'Lector De Biometríco', label: 'Lector De Biometríco' },
  { value: 'Modem', label: 'Modem' },
  { value: 'UPS', label: 'UPS' },
  { value: 'Switch', label: 'Switch' },
  { value: 'Router', label: 'Router' },
  { value: 'Batería', label: 'Batería' },
  { value: 'Inversor', label: 'Inversor' },
  { value: 'Televisor', label: 'Televisor' },
  { value: 'Proyector', label: 'Proyector' },
  { value: 'Telefono Fijo', label: 'Telefono Fijo' },
  { value: 'Telefono Celular', label: 'Telefono Celular' },
  { value: 'Silla', label: 'Silla' }
]

export function CrearItems () {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [item, setItem] = useState<createItem>({
    _id: '',
    nombre: '',
    descripcion: '',
    placa: '',
    serial: '',
    estado: "Bueno",
    company
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    axios.post('/createItem', item)
      .then(res => {
        setItem({
          _id: '',
          nombre: '',
          descripcion: '',
          placa: '',
          serial: '',
          estado: 'Bueno',
          company
        })
        setMessage(res.data.message)
        setTimeout(() => {
          setMessage('')
        }, 4000)
      })
      .catch(err => {
        console.log(err)
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 4000)
      })
  }

  return (
    <main className="h-[93vh] overflow-auto">

      <section>
        <form className="grid grid-cols-3 p-8 m-8 gap-3 rounded-lg bg-blue-5  00 place-items-center" onSubmit={handleSubmit}>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Nombre: </label>
            <select name="nombre" id="item" onChange={handleChange} value={item.nombre} className='border rounded-md p-2 border-gray-300'>
              <option value="">Selecciona un item</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Descripción | Marca</label>
            <input type="text" name="descripcion" value={item.descripcion} onChange={handleChange} placeholder="Genius - Teclado Gamer ..."
              className="px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Placa</label>
            <input type="text" name="placa" value={item.placa} onChange={handleChange}
              placeholder="MI-0001 / MA-0002 ..."
              className="px-3 py-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Serial</label>
            <input type="text" name="serial" value={item.serial} onChange={handleChange}
              placeholder="XFGRTWE675 / SN:JSURY6373 ..."
              className="px-3 py-2 border border-gray-300 rounded-md uppercase" required />
          </div>
          <div className="w-full flex flex-col mb-4">
            <label className="mb-2 font-semibold text-gray-700">Estado</label>
            <select name="estado" value={item.estado} onChange={handleChange} className="px-3 py-2 border border-gray-300 rounded-md">
              <option value="">Selecciona un estado</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Bueno">Bueno</option>
              <option value="Malo">Malo</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <button className="w-52 h-10 text-md font-semibold text-white bg-blue-600 rounded-md hover:bg-green-300 hover:text-black">
            Crear Item
          </button>
        </form>
      </section>

      <MessageDisplay message={message} error={error} />
    </main>
  )
}
