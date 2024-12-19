import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { newBodega } from "@/types/Bodegas";
import axios from "axios";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { VITE_API_URL } from "@/config/enviroments";
import { toast } from "sonner";

export default function NewBodega() {
  const [isLoading, setIsLoading] = useState(false)
  const [bodega, setBodega] = useState<newBodega>({ nombre: '', sucursal: 0, direccion: '' })
  const { company } = useAuth()

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault()
    setIsLoading(true)

    axios.post(`${VITE_API_URL}/createBodega`, { ...bodega, company })
      .then((res) => {
        console.log(res);
        toast.success('Bodega creada correctamente')
        setBodega({ nombre: '', sucursal: 0, direccion: '' })
      })
      .catch((err) => {
        console.log(err);
        toast.error('Error al crear la bodega', { description: err.response.data.error })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <section className="flex items-center justify-center h-full relative">
      <Link to="/bodegas">
        <Button className="absolute top-4 left-4">
          Regresar
        </Button>
      </Link>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Crear Una Nueva Bodega [ Sucursal ]</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="placa">Nombre Bodega | Punto de venta</Label>
              <Input
                id="placa"
                placeholder="Bodega Principal"
                value={bodega.nombre}
                onChange={ev => setBodega({ ...bodega, nombre: ev.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placa">N° Sucursal</Label>
              <Input
                id="placa"
                placeholder="0001"
                value={bodega.sucursal || ''}
                onChange={ev => setBodega({ ...bodega, sucursal: parseInt(ev.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="placa">Dirección</Label>
              <Input
                id="placa"
                placeholder="Cll 14 N° 14-14 ... | Cra 4 N° 57-17  ..."
                value={bodega.direccion}
                onChange={ev => setBodega({ ...bodega, direccion: ev.target.value })}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Bodega"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  )
}