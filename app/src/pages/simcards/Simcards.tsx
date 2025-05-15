import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { useAuth } from '@/contexts/auth/AuthProvider';
import { Separator } from '@/components/ui/separator';
import { VITE_API_URL } from '@/config/enviroments';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ButtonExportSimcards } from '@/components/ExportSimcards';

enum Estado {
  Activa = 'Activa',
  Inactiva = 'Inactiva',
}

enum Operador {
  Claro = 'Claro',
  Movistar = 'Movistar',
  Tigo = 'Tigo',
}

interface Bodega {
  _id: string;
  nombre: string;
  sucursal: number;
}

export interface Simcard {
  _id: string;
  numero: string;
  operador: Operador;
  estado: Estado;
  serial: string;
  apn: string;
  user: string;
  pass: string;
  createdAt: Date;
  updatedAt: Date;
  bodega: Bodega;
}

function RenderIconOperador({ operador }: { operador: Operador }) {

  const operadorIcon: { [key: string]: string } = {
    Claro: 'claro.webp',
    Movistar: 'movistar.webp',
    Tigo: 'tigo.webp',
  }

  return <img src={operadorIcon[operador]} alt={operador} className='w-10 h-10' />
}

export default function Simcards() {
  const { company } = useAuth();
  const [search, setSearch] = useState('');
  const [simcards, setSimcards] = useState<Simcard[]>([]);

  useEffect(() => {
    axios.get(`${VITE_API_URL}/simcardWhitBodega/${company}`)
      .then(response => {
        console.log(response.data)
        setSimcards(response.data);
      })
      .catch(error => console.error(error));
  }, [company]);

  return (
    <section>
      <div className='flex items-center justify-around'>
        <h1 className='text-2xl text-center font-semibold py-2'>Simcards</h1>
        <Label className='font-semibold'>Filtrar Simcards:</Label>
        <Input
          type='text'
          value={search}
          className='w-72'
          placeholder='serial, número, operadora'
          onChange={target => setSearch(target.target.value)}
        />
        <ButtonExportSimcards datos={simcards} />
      </div>

      <Separator />

      <div className='h-[90vh] 2xl:h-[92vh] overflow-y-auto'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Operador</TableCell>
              <TableCell>Número</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Sucursal</TableCell>
              <TableCell>Bodega</TableCell>
              <TableCell>APN</TableCell>
              <TableCell>Usuario</TableCell>
            </TableRow>

          </TableHeader>
          <TableBody>
            {
              simcards.map((simcard, index) => (
                <TableRow key={simcard._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <RenderIconOperador operador={simcard.operador} />
                  </TableCell>
                  <TableCell>{simcard.numero}</TableCell>
                  <TableCell>{simcard.estado}</TableCell>
                  <TableCell>{simcard.bodega.sucursal}</TableCell>
                  <TableCell>{simcard.bodega.nombre}</TableCell>
                  <TableCell>{simcard.apn}</TableCell>
                  <TableCell>{simcard.user}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </section >
  );
}