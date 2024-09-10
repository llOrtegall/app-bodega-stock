import { BottonExportSimcards } from '../../components/simcards/ExportSimcards'
import { type SimcardsArray } from '../../types/Simcard.interfaces'
import { RenderIconSims } from '../../components/simcards/RenderIcons'
import { simcardsBodegas } from '../../services/Simcards.services'
import { useFilterSimcards } from '../../hooks/useFilterSimcards'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'
import { Input, Label } from '../../components/ui'

export function VerSimcards(): JSX.Element {
  const { user } = useAuth()
  const company = user?.company!
  const [simcardsConBodega, setSimcardsConBodega] = useState<SimcardsArray>([])
  useEffect(() => {
    simcardsBodegas(company)
      .then(data => {
        setSimcardsConBodega(data as SimcardsArray)
      })
      .catch(err => {
        const errorString = err.response.data.error
        if (typeof errorString === 'string') console.log(errorString)
        else {
          console.log(err)
        }
      })
  }, [company])

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simcardsConBodega)

  return (
    <main className="overflow-auto">

      <section className='flex w-full justify-around gap-4 py-1 bg-blue-300 dark:bg-dark-tremor-brand-muted dark:text-white px-4'>
        <div className='flex items-center gap-2'>
          <Label>Filtrar Simcards:</Label>
          <Input type="text" placeholder="Buscar simcards..." value={searchSimcard} onChange={ev => { setSearchSimcard(ev.target.value) }} />
        </div>
        <div>
          <BottonExportSimcards simcards={filteredSimcards} />
        </div>
      </section>

      <article className="grid grid-cols-8 text-center bg-blue-200 dark:bg-blue-800 dark:text-white shadow-lg py-2 mb-2">
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
            <article key={item._id} className="grid grid-cols-8 place-items-center rounded-md bg-slate-300 dark:bg-dark-tremor-brand-muted uppercase text-sm py-2 my-2 text-center shadow-lg dark:text-white">
              <RenderIconSims operador={item.operador} />
              <p className="font-semibold">{item.numero}</p>
              <p className="text-gray-700 dark:text-gray-100 overflow-ellipsis text-start overflow-hidden">{item.serial}</p>
              <p className="text-gray-700 dark:text-gray-100 overflow-ellipsis text-start overflow-hidden">{item.apn}</p>
              <p className="text-gray-500 dark:text-gray-300">{item.estado}</p>
              <p className="text-gray-500 dark:text-gray-300">{item.user}</p>
              <p className="text-gray-500 dark:text-gray-300">{item.pass}</p>
              <p className='text-gray-700 dark:text-gray-100 font-semibold '>{typeof item.bodega !== 'string' ? item.bodega?.nombre : item.bodega}</p>
            </article>
          ))
          : <p className='text-center text-2xl font-semibold'>No Existen Items</p>
      }
    </main>
  )
}
