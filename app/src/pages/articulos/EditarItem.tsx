import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { OPTION_ITEMS_CREATED_AND_UPDATE } from '@/utils/constans'
import { useAuth } from "@/contexts/auth/AuthProvider";
import { VITE_API_URL } from "@/config/enviroments";
import { Textarea } from "@/components/ui/textarea";
import { ActivoInsumo } from "@/types/interfaces";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

export default function EditarItem() {
  const { company } = useAuth();
  const params = useParams();
  const id = params.id ? params.id : '';

  const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState<ActivoInsumo | null>(null)

  useEffect(() => {
    axios.get(`${VITE_API_URL}/getItem/${company}/${id}`)
      .then(response => {
        setItem(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [id, company]);

  const handleSubmit = (event: { preventDefault: () => void }): void => {
    event.preventDefault()
    const { _id, nombre, descripcion, estado, placa, serial } = item!

    const sendItem = { id: _id, nombre, descripcion, estado, placa, serial, company }

    setIsLoading(true)

    axios.patch(`${VITE_API_URL}/updateItem`, sendItem)
      .then(res => {
        if (res.status === 200) {
          toast.success(res.data.message as string);
          setIsLoading(false)
        }
      })
      .catch(error => {
        console.error(error);
        toast.error('Error al actualizar', { description: error.response.data.error });
        setIsLoading(false)
      });
  }

  return (
    <section className="flex items-center justify-center h-full relative">
      <Link to="/showItems">
        <Button className="absolute top-4 left-4">
          Regresar
        </Button>
      </Link>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Información Item [ Activo - Insumo ]</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Label>Nombre</Label>
              <Select
                value={item?.nombre}
                onValueChange={value => setItem({ ...item!, nombre: value })}
              >
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Seleccione Item" />
                </SelectTrigger>
                <SelectContent>
                  {
                    OPTION_ITEMS_CREATED_AND_UPDATE.map((item, index) => (
                      <SelectItem key={index} value={item.value}>{item.label}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <Label>Estado</Label>
              <Select
                value={item?.estado}
                onValueChange={value => setItem({ ...item!, estado: value })}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nuevo">Nuevo</SelectItem>
                  <SelectItem value="Bueno">Bueno</SelectItem>
                  <SelectItem value="Malo">Malo</SelectItem>
                  <SelectItem value="Baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <article className="flex gap-4">
              <div className="space-y-2">
                <Label htmlFor="placa">N° Placa</Label>
                <Input
                  id="placa"
                  placeholder="MI-0001 | SA-0002"
                  value={item?.placa}
                  onChange={ev => setItem({ ...item!, placa: ev.target.value })}
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="name">Serial</Label>
                <Input
                  className="uppercase"
                  id="name"
                  placeholder="Serial o N° de referencia"
                  value={item?.serial}
                  onChange={ev => setItem({ ...item!, serial: ev.target.value })}
                />
              </div>
            </article>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción / Marca</Label>
              <Textarea
                id="descripcion"
                placeholder="Marca, descripción o información adicional"
                value={item?.descripcion}
                onChange={ev => setItem({ ...item!, descripcion: ev.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Actualizando..." : "Actualizar item"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}