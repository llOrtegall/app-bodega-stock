import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { RenderIcon } from '@/components/RenderIcons';
import { BodegaItemsSimcard } from "@/types/Bodegas";
import { VITE_API_URL } from "@/config/enviroments";
import { Button } from "@/components/ui/button";
import { LayoutPanelTop } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router"
import axios from "axios";

export default function BodegaDetail() {
  const { company } = useAuth()
  const params = useParams();
  const id = params.id || '';

  const [data, setData] = useState<BodegaItemsSimcard | undefined>(undefined);

  useEffect(() => {
    axios.get(`${VITE_API_URL}/getBodegasItemsSims/${company}/${id}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [id, company])

  return (
    <div>
      <Link to="/bodegas">
        <Button className="absolute top-1.5 left-1.5">
          Regresar
        </Button>
      </Link>
      <div className='flex items-center justify-around'>
        <h1 className="text-2xl text-center font-semibold py-2">Bodega - [ Sucursal ] - {data?.sucursal}</h1>
        <Button>Exportar</Button>
      </div>
      <Separator />
      <Card className="m-1 p-4 flex justify-around gap-2">
        <article className="flex gap-4 items-center">
          <CardTitle>Nombre:</CardTitle>
          <CardDescription>
            <Badge variant="default" className="font-normal">{data?.nombre}</Badge>
          </CardDescription>
        </article>

        <article className="flex gap-4 items-center">
          <CardTitle>Dirreción: </CardTitle>
          <CardDescription>
            <Badge variant="default" className="font-normal">{data?.direccion}</Badge>
          </CardDescription>
        </article>

        <article className="flex gap-4 items-center">
          <CardTitle>UUID:</CardTitle>
          <CardDescription>
            <Badge variant="default" className="font-normal">{data?._id}</Badge>
          </CardDescription>
        </article>

        <figure className="col-span-2 flex gap-1 items-center justify-center ">
          <LayoutPanelTop size={24} />
          <span className="font-semibold">
            {data?.items.length}
          </span>
        </figure>

        <figure className="col-span-2 flex items-center justify-center ">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M6 4V20H18V7.82843L14.1716 4H6ZM5 2H15L19.7071 6.70711C19.8946 6.89464 20 7.149 20 7.41421V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM13 10V18H11V12H8V10H13ZM8 13H10V15H8V13ZM14 13H16V15H14V13ZM14 10H16V12H14V10ZM8 16H10V18H8V16ZM14 16H16V18H14V16Z"></path></svg>
          <span className="font-semibold">
            {data?.simcards.length}
          </span>
        </figure>

      </Card>
      <div className='h-[80vh] 2xl:h-[84vh] overflow-y-auto'>
        <Card className="m-1 p-4">
          <CardHeader>
            <CardTitle>Detallado De Items En Sucursal</CardTitle>
          </CardHeader>
          {
            data?.items !== undefined && data?.items.length > 0 ? (
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
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((item, index) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No hay items en esta bodega</p>
            )
          }
        </Card>
        <Card className="m-1 p-4">
          <CardHeader>
            <CardTitle>Detallado De Simcards En Sucursal</CardTitle>
          </CardHeader>
          {
            data?.simcards !== undefined && data?.simcards.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>N°</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Operador</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Serial</TableHead>
                    <TableHead>APN</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.simcards.map((item, index) => (
                    <TableRow key={item._id}>
                      <TableCell >{index + 1}</TableCell>
                      <TableCell >{item.numero}</TableCell>
                      <TableCell className='uppercase'>{item.operador}</TableCell>
                      <TableCell className=''>{item.estado}</TableCell>
                      <TableCell className='lowercase'>{item.serial}</TableCell>
                      <TableCell className=''>{item.apn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p>No hay items en esta bodega</p>
            )
          }
        </Card>
      </div>
    </div>
  )
}