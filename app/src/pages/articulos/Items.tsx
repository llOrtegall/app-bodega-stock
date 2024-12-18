import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { VITE_API_URL } from '@/config/enviroments'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

interface Bodega {
  nombre: string
  sucursal: string
}

interface Item {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: string
  createdAt: string
  updatedAt: string
  bodega: Bodega
}

export default function ItemsPage() {
  const { company } = useAuth()
  const [data, setData] = useState<Item[]>([])
  const navigate = useNavigate()

  const [search, setSearch] = useState('')

  const filteredItems = data.filter(({ placa, nombre, serial }) =>
    placa.toLowerCase().includes(search.toLowerCase()) ||
    nombre.toLowerCase().includes(search.toLowerCase()) ||
    serial.toLowerCase().includes(search.toLowerCase())
  )

  useEffect(() => {
    axios.get(`${VITE_API_URL}/itemsConBodegas/${company}`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }, [company])

  return (
    <section>
      <div className='flex justify-around py-4 border-b-2'>
        <div className='flex items-center gap-2'>
          <Label className=''>Filtrar Items:</Label>
          <Input
            type='text'
            value={search}
            className='w-60'
            placeholder='Buscar por nombre, placa o serial'
            onChange={target => setSearch(target.target.value)}
          />
        </div>
        <div>
          <Button>Exportar</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N°</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Serial</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Sucursal</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item, index) => (
            <TableRow key={item._id}>
              <TableCell >{index + 1}</TableCell>
              <TableCell >{item.nombre}</TableCell>
              <TableCell className='uppercase'>{item.serial}</TableCell>
              <TableCell className=''>{item.estado}</TableCell>
              <TableCell className='lowercase'>{item.descripcion}</TableCell>
              <TableCell className=''>{item.placa}</TableCell>
              <TableCell className=''>{item.bodega.sucursal}</TableCell>
              <TableCell className=''>{item.bodega.nombre}</TableCell>
              <TableCell className=''>
                <Button
                  onClick={() => navigate(`/editarItem/${item._id}`)}
                >Editar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}