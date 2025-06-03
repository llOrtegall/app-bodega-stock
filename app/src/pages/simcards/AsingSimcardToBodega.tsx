import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { VITE_API_URL } from "@/config/enviroments";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

interface SimcardI {
  _id: string
  numero: number,
  operador: string,
  estado: string,
  serial: string,
  apn: string,
  user: string,
  pass: string,
  createdAt: string,
  updatedAt: string,
  bodega: string
}

interface Bodega {
  _id: string
  sucursal: string
  nombre: string
  direccion: string
  updatedAt: string
}

export default function AsingSimcardToBodega() {
  const [simcards, setSimcards] = useState<SimcardI[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([])
  const [reload, setReload] = useState(false)
  const { company } = useAuth();

  const [bodegaSelected, setBodegaSelected] = useState<string>('')
  const [searchBog, setSearchBog] = useState('')

  const [simcarAdd, setSimcarAdd] = useState<string[]>([])

  const handleAddItem = (id: string) => {
    setSimcarAdd(sim => {
      if (!sim.includes(id)) {
        return [...sim, id]
      } else {
        return sim
      }
    })
  }

  const handleRemoveItem = (id: string) => {
    setSimcarAdd(preSims => {
      return preSims.filter(item => item !== id)
    })
  }

  useEffect(() => {
    axios.get(`${VITE_API_URL}/simcardWhitBodega/${company}`)
      .then((response) => {
        console.log("Simcards with Bodega:", response.data);
        setSimcards(response.data);
      })
      .catch((error) => {
        console.error("Error fetching simcards with bodega:", error);
      });

    setTimeout(() => {
      axios.get(`${VITE_API_URL}/getBodegas/${company}`)
        .then(res => {
          console.log(res.data);
          setBodegas(res.data)
        })
        .catch(err => console.log(err))
    }, 1000)
  }, [reload, company]);

  const bodegafiltered = bodegas.filter(({ nombre, sucursal, direccion }) => {
    return nombre.toLowerCase().includes(searchBog.toLowerCase()) ||
      sucursal.toString().toLowerCase().includes(searchBog.toLowerCase()) ||
      direccion.toLowerCase().includes(searchBog.toLowerCase())
  })

  const handleAssignItems = () => {
    if (simcarAdd.length === 0) {
      toast.error('Debe seleccionar al menos un item')
      return
    }

    if (bodegaSelected === '') {
      toast.error('Debe seleccionar una bodega o sucursal')
      return
    }

    // loading toast
    toast.loading('Asignando items...')

    axios.post(`${VITE_API_URL}/addSimcardToBodega`, {
      simcardIds: simcarAdd,
      sucursal: parseInt(bodegaSelected),
      company: company
    })
      .then(res => {
        if (res.status === 200) {
          toast.success('Items asignados correctamente')
          setSimcarAdd([])
          setBodegaSelected('')
          setReload(!reload);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Error al asignar items', { description: err.response.data.error })
      })
      .finally(() => {
        toast.dismiss()
      })

  }

  return (
    <>
      <section className="grid grid-cols-12 gap-1 px-1">
        <Card className="col-span-4 p-2 h-[80vh] overflow-y-auto">
          <Table >
            <TableHeader>
              <TableRow>
                <TableHead>Operador</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                simcards.map((sim) =>
                  sim.bodega === 'No Asignado' ? (
                    <TableRow key={sim._id}>
                      <TableCell>{sim.operador}</TableCell>
                      <TableCell>{sim.numero}</TableCell>
                      <TableCell>{sim.serial}</TableCell>
                      <TableCell>
                        {
                          // Renderizar el botón de agregar si el sim no está en la lista de sims a agregar
                          simcarAdd.includes(sim._id) ? (
                            null
                          ) : (
                            <button className='border rounded-full p-1 hover:bg-green-100'
                              onClick={() => handleAddItem(sim._id)}
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
          <p className='text-center pb-2'>Simcards Asignados</p>
          <Separator />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Operador</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {

                simcarAdd.map((item) => (
                  <TableRow key={item}>
                    <TableCell>{simcards.find(i => i._id === item)?.operador}</TableCell>
                    <TableCell>{simcards.find(i => i._id === item)?.serial}</TableCell>
                    <TableCell>
                      <button className='border rounded-full p-1 hover:bg-red-100'
                        onClick={() => handleRemoveItem(simcarAdd.find(i => i === item)!)}
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
    </>
  );
}