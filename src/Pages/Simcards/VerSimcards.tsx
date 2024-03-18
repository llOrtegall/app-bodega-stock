import { BottonExportSimcards } from '../../components/simcards/ExportSimcards.js'
import { SimcardWithBodega } from '../../types/Simcard.interfaces.js'
import { RenderIconSims } from '../../components/simcards/RenderIcons.js'
import { simcardsBodegas } from '../../services/Simcards.services'
import { useFilterSimcards } from '../../hooks/useFilterSimcards'
import { useAuth } from '../../Auth/AuthContext.js'
import { useEffect, useState } from 'react'

export function VerSimcards () {
  const { user } = useAuth()
  const company = user?.empresa || ''
  const [simcardsConBodega, setSimcardsConBodega] = useState<SimcardWithBodega[]>([])
  useEffect(() => {
    simcardsBodegas(company)
      .then(data => {
        setSimcardsConBodega(data)
      })
      .catch(err => console.log(err))
  }, [company])

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simcardsConBodega)

  return (
    <main className="h-[92vh] overflow-auto">

      <section className='flex w-full justify-center items-center gap-4 py-1 bg-blue-600 px-4'>
        <p className=""><span className="font-semibold pr-2">Filtrar:</span>| Operador | Serial | Número</p>
        <input type="text" placeholder="Buscar simcards..."
          value={searchSimcard} onChange={ev => setSearchSimcard(ev.target.value)}
          className="bg-slate-200 w-64 p-1.5 rounded-md" />
         <BottonExportSimcards simcards={filteredSimcards} />
      </section>

      <article className="grid grid-cols-8 text-center bg-blue-500 shadow-lg py-2 mb-2">
        <p className="font-semibold">Operador</p>
        <p className="font-semibold">Número</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">APN</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">User</p>
        <p className="font-semibold">Pass</p>
        <p className="font-semibold">Ubicación</p>

      </article>
      {
        filteredSimcards?.length > 0
          ? filteredSimcards?.map(item => (
            <article key={item._id} className="grid grid-cols-8 place-items-center rounded-md bg-slate-200 uppercase text-sm py-2 my-2 text-center shadow-lg">
              <RenderIconSims operador={item.operador} />
              <p className="font-semibold">{item.numero}</p>
              <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
              <p className="text-gray-700 overflow-ellipsis text-start overflow-hidden">{item.apn}</p>
              <p className="text-gray-500">{item.estado}</p>
              <p className="text-gray-500">{item.user}</p>
              <p className="text-gray-500">{item.pass}</p>
              <p className='text-gray-700 font-semibold text-xs'>{ typeof item.bodega !== 'string' ? item.bodega?.nombre : item.bodega }</p>
            </article>
          ))
          : <p className='text-center text-2xl font-semibold'>No Existen Items</p>
      }
    </main>
  )
}
