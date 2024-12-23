import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth/AuthProvider'
import { Separator } from '@/components/ui/separator'
import { VITE_API_URL } from '@/config/enviroments'
import { Movimiento } from '@/types/Movimiento'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function MovimientosPage() {
  const { company } = useAuth()
  const [search, setSearch] = useState('')
  const [data, setData] = useState<Movimiento[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${VITE_API_URL}/getMovimientos/${company}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [company])

  const sortData = data.sort((a, b) => b.movimientoId - a.movimientoId)

  return (
    <section className=''>

      <header className='flex items-center justify-around py-2'>
        <Label className=''>Filtrar Movimiento:</Label>
        <Input
          type='text'
          value={search}
          className='w-60'
          placeholder='Buscar por nombre, placa o serial'
          onChange={target => setSearch(target.target.value)}
        />
        <Button>Exportar</Button>
      </header>

      <Separator />

      <div className='overflow-y-auto h-[90vh]'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N°</TableHead>
              <TableHead className='w-[110px]'>Fecha Mov</TableHead>
              <TableHead className='w-[110px]'>N° Incidente</TableHead>
              <TableHead>Encargado</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Items Mov</TableHead>
              <TableHead>Sims Mov</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='cursor-pointer'>
            {sortData.map((item) => (
              <TableRow key={item._id} onClick={() => navigate(`/movimiento/${item._id}`)}>
                <TableCell >{item.movimientoId}</TableCell>
                <TableCell >{item.updatedAt.split('T')[0]}</TableCell>
                <TableCell className='uppercase'>{item.incidente}</TableCell>
                <TableCell className=''>{item.encargado.split(' ')[0]} {item.encargado.split(' ')[1]}</TableCell>
                <TableCell className='lowercase' title={item.bodegaOrigen.nombre}>{item.bodegaOrigen.sucursal}</TableCell>
                <TableCell className='' title={item.bodegaDestino.nombre}>{item.bodegaDestino.sucursal}</TableCell>
                <TableCell className='text-center'>{item.items.entran.length + item.items.salen.length}</TableCell>
                <TableCell className='text-center'>{item.simcards.entran.length + item.simcards.salen.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}