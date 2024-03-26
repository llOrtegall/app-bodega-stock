import { BodegaIcon, BoxIcon, ComputerIcon, FilterIcon, HomePdvIcon, MovilIcon, SimcardIcon, UserIcon } from '../../components/icons'
import { getBodegasItemsSimsIds } from '../../services/Bodegas.services'
import { useFiltersBodegas } from '../../hooks/useFilterBodegas'
import { Button, Input, Label } from '../../components/ui'
import { type Bodegas } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ShowBodegas (): JSX.Element {
  const [bodegas, setBodegas] = useState<Bodegas>([])
  const { user } = useAuth()
  const company = user.empresa

  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  useEffect(() => {
    getBodegasItemsSimsIds(company)
      .then(data => { setBodegas(data) })
      .catch(err => { console.log(err) })
  }, [])

  const sendName = (texto: string): void => {
    setSearchBodega(texto)
  }

  return (
    <main className="h-[92vh] overflow-auto">

      <section className="flex items-center justify-center gap-6 p-2 bg-blue-900 shadow-lg">
        <div>
          <Label textColor='text-white'>Filtrar Bodega :</Label>
        </div>
        <div className='w-[350px]'>
          <Input type='text' value={searchBodega} onChange={({ target }) => { setSearchBodega(target.value) }}
            placeholder=' 31424 | Cll 13 an # 12-45 | PDV-24 ' />
        </div>

        <div>
          <Button title='Traer Solo Bodegas' onClick={(): void => { sendName('bodega') }}>
            <BodegaIcon size='20' />
          </Button>
        </div>

        <div>
          <Button title='Traer Solo Punto De Venta' onClick={(): void => { sendName('pdv') }}>
            <HomePdvIcon size='20' />
          </Button>
        </div>

        <div>
          <Button title='Limpiar Filtro' onClick={(): void => { sendName('') }}>
            <FilterIcon />
          </Button>
        </div>

      </section>

      <div className='grid grid-cols-2'>
        {
          filteredBodegas.map(bodega => (
            <section key={bodega._id} className="flex h-auto bg-slate-300 m-2 rounded-md p-2 items-center justify-around">

              <article className='flex gap-12 items-center'>
                {bodega.sucursal.toString().length > 5 ? <UserIcon /> : null}
                {bodega.nombre.toLowerCase().includes('bodega') ? <BodegaIcon size='36' /> : null}
                {bodega.nombre.toLocaleLowerCase().includes('pdv') ? <HomePdvIcon size='36' /> : null}
                {bodega.nombre.toLocaleLowerCase().includes('movil -') ? <MovilIcon /> : null}
                {bodega.nombre.toLocaleLowerCase().includes('tat -') ? <ComputerIcon /> : null}

                <article className="w-96">
                  <h2 className="font-semibold">{bodega.nombre}</h2>
                  <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
                  <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
                </article>
              </article>

              <article className="flex items-center gap-2">
                <BoxIcon />
                <p className="font-semibold">{bodega.items?.length}</p>
              </article>

              <article className='flex items-center gap-2'>
                <SimcardIcon />
                <p className="font-semibold">{bodega.simcards?.length}</p>
              </article>

              <div>
                <Link className='w-full shadow-lg bg-blue-600 p-2 rounded-md font-semibold text-white hover:bg-green-500 transition-all duration-300 ease-in-out' to={`/bodega/detalle/${bodega._id}`} key={bodega._id}>Ver Info</Link>
              </div>

            </section>
          ))
        }
      </div>
    </main>
  )
}
