import { Button, Input, Label, MessageDisplay } from '../../components/ui'
import { postBodega } from '../../services/Bodegas.services'
import { type createBodega } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import { useState } from 'react'

export function CrearBodega (): JSX.Element {
  const { user } = useAuth()
  const company = (user != null) ? user.empresa : ''
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // nombre, sucursal, direccion
  const [item, setItem] = useState<createBodega>({
    nombre: '',
    sucursal: '',
    direccion: '',
    company
  })

  const handleChange = (e: { target: { name: string, value: string } }): void => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    void postBodega(item)
      .then((response) => {
        if (response.status === 201) {
          setItem({
            nombre: '',
            sucursal: '',
            direccion: '',
            company
          })
          const stringResponse = response.data.message
          if (typeof stringResponse === 'string') {
            setMessage(stringResponse)
            setTimeout(() => {
              setMessage('')
            }, 3000)
          }
        }
      })
      .catch((error) => {
        const errorString = error.response.data.error
        if (typeof errorString === 'string') {
          setError(errorString)
          setTimeout(() => {
            setError('')
          }, 3000)
        }
      })
  }
  return (
    <main className="flex flex-col items-center justify-center">
      <form className="flex flex-col w-1/2 gap-4 py-20 px-12 border rounded-md my-12 bg-slate-300 text-2xl"
        onSubmit={handleSubmit} >
        <div className="w-full flex flex-col gap-2">
          <Label>Nombre Bodega | PDV:</Label>
          <Input type="text" name="nombre" value={item.nombre} onChange={handleChange}
            placeholder="Bodega Principal ... | PDV 12 ..." />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Label>N° Sucursal:</Label>
          <Input type="text" name="sucursal" value={item.sucursal} onChange={handleChange}
            placeholder="401923 | 401924 ..." />
        </div>
        <div className="w-full flex flex-col gap-2 mb-8">
          <Label>Dirección:</Label>
          <Input type="text" name="direccion" value={item.direccion} onChange={handleChange}
            placeholder="Cra 4 # 4-56 ... | Calle 5 # 5-67 ..."/>
        </div>

        <Button type='submit' >
          Crear Bodega | PDV
        </Button>
      </form>

      <MessageDisplay message={message} error={error} />

    </main>
  )
}
