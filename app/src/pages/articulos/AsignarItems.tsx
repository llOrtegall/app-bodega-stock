import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { VITE_API_URL } from "@/config/enviroments";
import { PlusIcon, Trash2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import axios from "axios";
import { toast } from 'sonner';

// TODO: mover está interfaz a un archivo types/interfaces.ts
interface Item {
  _id: string
  nombre: string
  descripcion: string
  placa: string
  serial: string
  estado: string
  createdAt: string
  updatedAt: string
  bodega: {
    _id: string
    nombre: string
    sucursal: string
  } | string
}

interface Bodega {
  _id: string
  sucursal: string
  nombre: string
  direccion: string
  updatedAt: string
}

export default function AsignarItems() {
  const { company } = useAuth()
  const [data, setData] = useState<Item[]>([])
  const [bodegas, setBodegas] = useState<Bodega[]>([])
  const [reload, setReload] = useState(false)

  const [bodegaSelected, setBodegaSelected] = useState<string>('')
  const [searchBog, setSearchBog] = useState('')

  const bodegafiltered = bodegas.filter(({ nombre, sucursal, direccion }) => {
    return nombre.toLowerCase().includes(searchBog.toLowerCase()) ||
      sucursal.toString().toLowerCase().includes(searchBog.toLowerCase()) ||
      direccion.toLowerCase().includes(searchBog.toLowerCase())
  })

  // TODO: implementar la lógica para asignar items a una bodega
  const [itemsToAdd, setItemsToAdd] = useState<string[]>([])

  const handleAddItem = (id: string) => {
    setItemsToAdd(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }

  const handleRemoveItem = (id: string) => {
    setItemsToAdd(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }

  useEffect(() => {
    axios.get(`${VITE_API_URL}/itemsConBodegas/${company}`)
      .then(res => {
        setData(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))

    setTimeout(() => {
      axios.get(`${VITE_API_URL}/getBodegas/${company}`)
        .then(res => {
          console.log(res.data);
          setBodegas(res.data)
        })
        .catch(err => console.log(err))
    }, 1000)
  }, [company, reload])

  const handleAssignItems = () => {

    axios.post(`${VITE_API_URL}/addItemsToBodega`, {
      itemIds: itemsToAdd,
      sucursal: parseInt(bodegaSelected),
      company: company
    })
      .then(res => {
        console.log(res.data);
        if (res.status === 200) {
          toast.success('Items asignados correctamente')
          setItemsToAdd([])
          setReload(!reload)
          setBodegaSelected('')
        }

      })
      .catch(err => {
        console.log(err);
        toast.error('Error al asignar items', { description: err.response.data.error })
      })
  }

  return (
    <section>
      <div className='flex items-center justify-around'>
        <h1 className="text-2xl text-center font-semibold py-2">Asignar Items ( Activos - Insumos ) a bodega - [ Sucursal ]</h1>
      </div>
      <Separator />

      <section className="grid grid-cols-12 gap-1 px-1">
        <Card className="col-span-4 p-2 h-[80vh] overflow-y-auto">
          <p className='text-center pb-2'>Items Sin Bodega ó Sucursal</p>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Placa</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                data.map((item) =>
                  item.bodega === 'No Asignado' ? (
                    <TableRow key={item._id}>
                      <TableCell>{item.placa}</TableCell>
                      <TableCell>{item.nombre}</TableCell>
                      <TableCell>
                        {
                          // Renderizar el botón de agregar si el item no está en la lista de items a agregar
                          itemsToAdd.includes(item._id) ? (
                            null
                          ) : (
                            <button className='border rounded-full p-1 hover:bg-green-100'
                              onClick={() => handleAddItem(item._id)}
                            >
                              <PlusIcon size={12} />
                            </button>
                          )
                        }

                      </TableCell>
                    </TableRow>
                  ) :
                    null
                )
              }
            </TableBody>
          </Table>

        </Card>

        <Card className="col-span-4 p-2 h-[80vh] overflow-y-auto">
          <p className='text-center pb-2'>Items Asignados</p>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° Placa</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                // Renderizar los items que se van a agregar a la bodega
                itemsToAdd.map((item) => (
                  <TableRow key={item}>
                    <TableCell>{data.find(i => i._id === item)?.placa}</TableCell>
                    <TableCell>{data.find(i => i._id === item)?.nombre}</TableCell>
                    <TableCell>
                      <button className='border rounded-full p-1 hover:bg-red-100'
                        onClick={() => handleRemoveItem(itemsToAdd.find(i => i === item)!)}
                      >
                        <Trash2Icon size={12} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Card>

        <Card className="col-span-4 p-2">
          <p className='text-center pb-2'>Bodegas - [Sucursales] - {company}</p>
          <article className="flex items-center gap-1 pb-1">
            <Label className='font-semibold w-full'>Filtrar Bodegas:</Label>
            <Input
              type='text'
              value={searchBog}
              className='w-60'
              placeholder='Buscar nombre, sucursal o dirección'
              onChange={target => setSearchBog(target.target.value)}
            />
          </article>
          <Separator className='mb-2' />
          <Select
            value={bodegaSelected}
            onValueChange={(value) => setBodegaSelected(value)}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Seleccionar bodega ó sucursal" />
            </SelectTrigger>
            <SelectContent>
              {
                bodegafiltered.map((bodega) => (
                  <SelectItem key={bodega._id} value={bodega.sucursal}>
                    {bodega.sucursal} - {bodega.nombre}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </Card>

      </section>
      <div className='w-full flex justify-center py-2'>
        <Button onClick={handleAssignItems}>
          Asignar Items
        </Button>
      </div>
    </section>
  )
}