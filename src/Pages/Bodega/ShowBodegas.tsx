import { getBodegasItemsSimsIds } from '../../services/Bodegas.services'
import { useFiltersBodegas } from '../../hooks/useFilterBodegas'
import { type Bodegas } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function ShowBodegas (): JSX.Element {
  const [bodegas, setBodegas] = useState<Bodegas>([])
  const { user } = useAuth()
  const company = (user != null) ? user.empresa : ''

  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  useEffect(() => {
    getBodegasItemsSimsIds(company)
      .then(data => { setBodegas(data) })
      .catch(err => { console.log(err) })
  }, [])

  return (
    <main className="h-[92vh] overflow-auto">

      <section className="flex items-center justify-center gap-6 p-1 bg-blue-500  rounded-md shadow-lg">
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Sucursal | Nombre |</p>
        <input type="text" value={searchBodega} onChange={ev => { setSearchBodega(ev.target.value) }}
          placeholder="Buscar Bodega..." className="bg-slate-100 w-64 p-1.5 rounded-md" />
      </section>

      {
        filteredBodegas.map(bodega => (
          <section key={bodega._id} className="flex h-auto bg-slate-300 m-2 rounded-md p-2 items-center justify-around">

            <article className="w-96">
              <h2 className="font-semibold">{bodega.nombre}</h2>
              <p><span className="font-semibold">Sucursal: </span> {bodega.sucursal}</p>
              <p><span className="font-semibold">Dirección: </span>{bodega.direccion}</p>
            </article>

            <article className="">
              <p>Items Asignados: <span className="font-semibold">{bodega.items.length}</span></p>
            </article>

            <article className="">
              <p>Simcards Asignadas: <span className="font-semibold">{bodega.simcards.length}</span></p>
            </article>

            <Link className="p-2 text-white font-semibold rounded-md bg-blue-400 hover:bg-blue-600" to={`/bodega/detalle/${bodega._id}`} key={bodega._id}>
              Ver Detalle Bodega
            </Link>
          </section>
        ))
      }
    </main>
  )
}
