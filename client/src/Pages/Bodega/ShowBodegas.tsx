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
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM19 20V4H5V20H19ZM8 11H11V13H8V11ZM8 7H11V9H8V7ZM8 15H11V17H8V15ZM13 15H16V17H13V15ZM13 11H16V13H13V11ZM13 7H16V9H13V7Z"></path></svg>
          </Button>
        </div>

        <div>
          <Button title='Traer Solo Punto De Venta' onClick={(): void => { sendName('pdv') }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12.6727 1.61162 20.7999 9H17.8267L12 3.70302 6 9.15757V19.0001H11V21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001 11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162ZM14 11H23V18H14V11ZM16 13V16H21V13H16ZM24 21H13V19H24V21Z"></path></svg>
          </Button>
        </div>

        <div>
          <Button title='Limpiar Filtro' onClick={(): void => { sendName('') }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M6.92893 0.514648L21.0711 14.6568L19.6569 16.071L15.834 12.2486L15 13.4999V21.9999H9V13.4999L4 5.99993H3V3.99993L7.585 3.99965L5.51472 1.92886L6.92893 0.514648ZM9.585 5.99965L6.4037 5.99993L11 12.8944V19.9999H13V12.8944L14.392 10.8066L9.585 5.99965ZM21 3.99993V5.99993H20L18.085 8.87193L16.643 7.42893L17.5963 5.99993H15.213L13.213 3.99993H21Z"></path></svg>
          </Button>
        </div>

      </section>

      <div className='grid grid-cols-2'>
        {
          filteredBodegas.map(bodega => (
            <section key={bodega._id} className="flex h-auto bg-slate-300 m-2 rounded-md p-2 items-center justify-around">

              <article className='flex gap-12 items-center'>
                {bodega.nombre.toLowerCase().includes('bodega') ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M21 20H23V22H1V20H3V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V20ZM19 20V4H5V20H19ZM8 11H11V13H8V11ZM8 7H11V9H8V7ZM8 15H11V17H8V15ZM13 15H16V17H13V15ZM13 11H16V13H13V11ZM13 7H16V9H13V7Z"></path></svg> : null}
                {bodega.nombre.toLocaleLowerCase().includes('pdv') ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M12.6727 1.61162 20.7999 9H17.8267L12 3.70302 6 9.15757V19.0001H11V21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001 11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162ZM14 11H23V18H14V11ZM16 13V16H21V13H16ZM24 21H13V19H24V21Z"></path></svg> : null}
                {bodega.nombre.toLocaleLowerCase().includes('tat -') ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M4 16H20V5H4V16ZM13 18V20H17V22H7V20H11V18H2.9918C2.44405 18 2 17.5511 2 16.9925V4.00748C2 3.45107 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44892 22 4.00748V16.9925C22 17.5489 21.5447 18 21.0082 18H13Z"></path></svg> : null}
                {bodega.nombre.toLocaleLowerCase().includes('movil -') ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M7 4V20H17V4H7ZM6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"></path></svg> : null}
                {bodega.sucursal.toString().length > 5 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M20 22H18V20C18 18.3431 16.6569 17 15 17H9C7.34315 17 6 18.3431 6 20V22H4V20C4 17.2386 6.23858 15 9 15H15C17.7614 15 20 17.2386 20 20V22ZM12 13C8.68629 13 6 10.3137 6 7C6 3.68629 8.68629 1 12 1C15.3137 1 18 3.68629 18 7C18 10.3137 15.3137 13 12 13ZM12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"></path></svg> : null}

                <article className="w-96">
                  <h2 className="font-semibold">{bodega.nombre}</h2>
                  <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
                  <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
                </article>
              </article>

              <article className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M4 5H20V3H4V5ZM20 9H4V7H20V9ZM3 11H10V13H14V11H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V11ZM16 13V15H8V13H5V19H19V13H16Z"></path></svg>
                <p className="font-semibold">{bodega.items?.length}</p>
              </article>

              <article className='flex items-center gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="currentColor"><path d="M6 4V20H18V7.82843L14.1716 4H6ZM5 2H15L19.7071 6.70711C19.8946 6.89464 20 7.149 20 7.41421V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V3C4 2.44772 4.44772 2 5 2ZM13 10V18H11V12H8V10H13ZM8 13H10V15H8V13ZM14 13H16V15H14V13ZM14 10H16V12H14V10ZM8 16H10V18H8V16ZM14 16H16V18H14V16Z"></path></svg>
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
