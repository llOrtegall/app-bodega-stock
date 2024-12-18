import { useAuth } from "@/contexts/auth/AuthProvider";
import { VITE_API_URL } from "@/config/enviroments";
import { Movimiento } from "@/types/Movimiento";
import { useEffect, useState } from "react";
import { useParams } from "react-router"
import axios from "axios";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function MovDetalle() {
  const { company } = useAuth()
  const params = useParams()
  const id = params.id || '';
  const [data, setData] = useState<Movimiento | undefined>(undefined)

  useEffect(() => {
    axios.get(`${VITE_API_URL}/movimiento/${company}/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err))
  }, [id, company])

  return (
    <div>
      <div className="py-2">
        <h1 className="text-2xl text-center font-semibold">Detalle Movimiento</h1>
        <article className="flex items-center justify-center bg-blue-200 py-1 px-2">
          <p className="font-semibold">Bodega Origen: <Badge className="font-normal" variant={'secondary'}>{data?.bodegaOrigen.nombre}</Badge></p>
          ➡️
          <p className="font-semibold">Bodega Destino: <Badge className="font-normal" variant={'secondary'}>{data?.bodegaDestino.nombre}</Badge></p>
        </article>
      </div>
      <Separator />
      <section className="grid grid-cols-2 gap-2 mt-2">
        <Card className="">
          <CardHeader>
            <CardTitle>Información Del Movimiento</CardTitle>
            <CardDescription>resumen detallado del movimiento realizado</CardDescription>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Información Del Movimiento</CardTitle>
            <CardDescription>resumen detallado del movimiento realizado</CardDescription>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Información Del Movimiento</CardTitle>
            <CardDescription>resumen detallado del movimiento realizado</CardDescription>
          </CardHeader>
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Información Del Movimiento</CardTitle>
            <CardDescription>resumen detallado del movimiento realizado</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </div>
  )
}