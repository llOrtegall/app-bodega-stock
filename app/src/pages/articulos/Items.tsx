import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { Separator } from '@/components/ui/separator'
import { RenderIcon } from '@/components/RenderIcons'
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
      <header className='flex items-center justify-around py-2'>

        <Label className=''>Filtrar Items:</Label>
        <Input
          type='text'
          value={search}
          className='w-60'
          placeholder='Buscar por nombre, placa o serial'
          onChange={target => setSearch(target.target.value)}
        />

        <div>
          <Button>Exportar</Button>
        </div>
      </header>

      <Separator />

      <div className='h-[90vh] 2xl:h-[92vh] 3xl:h-[94vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N°</TableHead>
              <TableHead>Icon</TableHead>
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
                <TableCell >
                  <RenderIcon nameStr={item.nombre} />
                </TableCell>
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
      </div>
    </section>
  )
}