import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
import { Textarea } from "@/components/ui/textarea";
import { MoveRight } from 'lucide-react';

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
      <h1 className="text-2xl text-center font-semibold">Detalle Movimiento</h1>
      <Separator />
      <section className="grid grid-cols-2 gap-2 mt-2">

        <Card className="">
          <CardHeader>
            <CardTitle>N° Incidente</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">{data?.incidente}</Badge>
            </CardDescription>
            <CardTitle>Encargado</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">{data?.encargado}</Badge>
            </CardDescription>
            <CardTitle>Fecha y Hora</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">{data?.createdAt.split('T')[0]}</Badge>
              <span> - </span>
              <Badge variant="default" className="font-normal">{data?.createdAt.split('T')[1].slice(0, 5)}</Badge>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Bodega Origen</CardTitle>
            <CardDescription className="flex justify-between">
              <Badge variant="default" className="font-normal">{data?.bodegaOrigen.nombre}</Badge>
              <div>
                <span>Sucursal: </span>
                <Badge variant="default" className="font-normal">{data?.bodegaOrigen.sucursal}</Badge>
              </div>
            </CardDescription>
            <CardTitle>Bodega Destino</CardTitle>
            <CardDescription className="flex justify-between">
              <Badge variant="default" className="font-normal">{data?.bodegaDestino.nombre}</Badge>
              <div>
                <span>Sucursal: </span>
                <Badge variant="default" className="font-normal">{data?.bodegaDestino.sucursal}</Badge>
              </div>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="">
          <CardHeader className="grid grid-cols-3 gap-2">
            <CardTitle className='col-span-2'>N° Movimiento</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">{data?.movimientoId}</Badge>
            </CardDescription>
            <CardTitle className='col-span-2'>N° Items Movidos ( Activos - Insumos)</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">
                {(data?.items.entran?.length ?? 0) + (data?.items.salen?.length ?? 0)}
              </Badge>
            </CardDescription>
            <CardTitle className='col-span-2'>N° Simcards Movidas</CardTitle>
            <CardDescription>
              <Badge variant="default" className="font-normal">
                {(data?.simcards.entran?.length ?? 0) + (data?.simcards.salen?.length ?? 0)}
              </Badge>
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="">
          <CardHeader>
            <CardTitle>Descripción:</CardTitle>
            <Textarea value={data?.descripcion} />
          </CardHeader>
        </Card>

      </section>

      <div className="py-2">
        <article className="flex items-center justify-center bg-blue-200 py-1 px-2">
          <p className="font-semibold"> <Badge className="font-normal" variant={'secondary'}>{data?.bodegaOrigen.nombre}</Badge></p>
          <MoveRight size={24} />
          <p className="font-semibold"> <Badge className="font-normal" variant={'secondary'}>{data?.bodegaDestino.nombre}</Badge></p>
        </article>
      </div>

      {
        data?.items.entran.length !== undefined && data?.items.entran.length > 0 ? (
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.items.entran.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell >{item.nombre}</TableCell>
                  <TableCell className='lowercase'>{item.descripcion}</TableCell>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell className='uppercase'>{item.serial}</TableCell>
                  <TableCell>{item.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null
      }

      <div className="py-2">
        <article className="flex items-center justify-center bg-blue-200 py-1 px-2">
          <p className="font-semibold"> <Badge className="font-normal" variant={'secondary'}>{data?.bodegaDestino.nombre}</Badge></p>
          <MoveRight size={24} />
          <p className="font-semibold"> <Badge className="font-normal" variant={'secondary'}>{data?.bodegaOrigen.nombre}</Badge></p>
        </article>
      </div>

      {
        data?.items.salen.length !== undefined && data?.items.salen.length > 0 ? (
          <Table>

            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Placa</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.items.salen.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell >{item.nombre}</TableCell>
                  <TableCell className='lowercase'>{item.descripcion}</TableCell>
                  <TableCell>{item.placa}</TableCell>
                  <TableCell className='uppercase'>{item.serial}</TableCell>
                  <TableCell>{item.estado}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null
      }

      {
        data?.simcards.entran.length !== undefined && data?.simcards.entran.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N°</TableHead>
                <TableHead>Número</TableHead>
                <TableHead>Operador</TableHead>
                <TableHead>Serial</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>APN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.simcards.entran.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell >{index + 1}</TableCell>
                  <TableCell >{item.numero}</TableCell>
                  <TableCell>{item.operador}</TableCell>
                  <TableCell>{item.serial}</TableCell>
                  <TableCell>{item.estado}</TableCell>
                  <TableCell>{item.apn}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : null
      }

    </div>
  )
}