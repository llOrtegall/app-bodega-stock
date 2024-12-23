import { LayoutPanelTop, Building2, StoreIcon, MonitorSmartphone, Smartphone, User2 } from 'lucide-react';
import { Card, CardDescription, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Separator } from '@/components/ui/separator';
import { useEffect, useMemo, useState } from 'react';
import { VITE_API_URL } from '@/config/enviroments';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router';
import { Bodega } from '@/types/Bodegas';
import axios from 'axios';

function IconName(nameSplited: string) {
  if (nameSplited === 'bodega') return <Building2 size={24} />
  if (nameSplited === 'pdv') return <StoreIcon size={24} />
  if (nameSplited === 'tat') return <MonitorSmartphone size={24} />
  if (nameSplited === 'movil') return <Smartphone size={24} />

  return <User2 size={24} />
}

export default function BodegasPage() {
  const [search, setSearch] = useState('')
  const { company } = useAuth()
  const [data, setData] = useState<Bodega[]>([])

  useEffect(() => {
    axios.get(`${VITE_API_URL}/getBodegasItemsSimcardIds/${company}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
  }, [company])

  const filteredBodegas = useMemo(() => {
    return data.filter(({ nombre, sucursal, direccion }) =>
      nombre.toLowerCase().includes(search.toLowerCase()) ||
      sucursal.toString().toLowerCase().includes(search.toLowerCase()) ||
      direccion.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  const navigate = useNavigate()

  return (
    <div>
      <header className='flex items-center justify-around'>
        <h1 className='text-2xl text-center font-semibold py-2'>Bodegas - [ Sucursales ]</h1>
        <article className='flex items-center gap-2'>
          <Label className='font-semibold'>Filtrar Bodegas:</Label>
          <Input
            type='text'
            value={search}
            className='w-72'
            placeholder='Buscar nombre, sucursal o dirección'
            onChange={target => setSearch(target.target.value)}
          />
        </article>
        <Button>Exportar</Button>
      </header>

      <Separator />

      <section className='h-[90vh] 2xl:h-[94vh] overflow-y-auto grid 2xl:grid-cols-2'>
        {
          filteredBodegas?.map(bod => (
            <Card className='m-1 p-4 grid grid-cols-12' key={bod._id}>

              <figure className='col-span-2 flex items-center justify-center '>
                {IconName(bod.nombre.split(' ')[0].toLocaleLowerCase())}
              </figure>

              <div className='col-span-6 gap-2 flex flex-col'>
                <CardTitle>{bod.nombre}</CardTitle>

                <article className='flex gap-4 items-center'>
                  <CardTitle>Sucursal:</CardTitle>
                  <CardDescription>
                    <Badge variant='default' className='font-normal'>{bod.sucursal}</Badge>
                  </CardDescription>
                </article>

                <article className='flex gap-4 items-center'>
                  <CardTitle>Dirreción:</CardTitle>
                  <CardDescription>
                    <Badge variant='default' className='font-normal'>{bod.direccion}</Badge>
                  </CardDescription>
                </article>
              </div>

              <figure className='col-span-1 flex gap-1 items-center justify-center '>
                <LayoutPanelTop size={24} />
                <span className='font-semibold'>
                  {bod.items.length}
                </span>
              </figure>

              <figure className='col-span-1 flex items-center justify-center '>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='28' height='28' fill='currentColor'><path d='M6 4V20H18V7.82843L14.1716 4H6ZM5 2H15L19.7071 6.70711C19.8946 6.89464 20 7.149 20 7.41421V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM13 10V18H11V12H8V10H13ZM8 13H10V15H8V13ZM14 13H16V15H14V13ZM14 10H16V12H14V10ZM8 16H10V18H8V16ZM14 16H16V18H14V16Z'></path></svg>
                <span className='font-semibold'>
                  {bod.simcards.length}
                </span>
              </figure>

              <div className='col-span-2 flex items-center justify-center'>
                <Button
                  onClick={() => navigate(`/bodega/${bod._id}`)}
                  className='hover:bg-blue-100' variant='secondary'
                >
                  Detallado
                </Button>
              </div>

            </Card>
          ))
        }
      </section>

    </div >
  )
}