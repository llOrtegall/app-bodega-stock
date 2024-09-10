import BodegaItemsDetail from '../../components/Bodega/BodItemsDetails'
import BodSimsDetails from '../../components/Bodega/BodSimsDetails'

import { getDetailBodegaById } from '../../services/Bodegas.services'
import { LocationIcon } from '../../components/icons/LocationIcon'
import { BoxIcon, SimcardIcon } from '../../components/icons'
import { type BodegaIntIS } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function DetalleBodega(): JSX.Element {
  const { user } = useAuth()
  const company = user?.company!
  const { id } = useParams()

  const [bodega, setBodega] = useState<BodegaIntIS>()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isExpandedSim, setIsExpandedSim] = useState(false)

  const handleToggle = (): void => {
    setIsExpanded(!isExpanded)
  }

  const handleToggleSim = (): void => {
    setIsExpandedSim(!isExpandedSim)
  }

  useEffect(() => {
    if (id === undefined) return
    void getDetailBodegaById({ company, id })
      .then(data => { setBodega(data) })
  }, [id, company])

  return (
    <main>
      {
        (bodega != null) && (
          <section>
            <h1 className='text-center p-4 bg-blue-800 text-white xl:text-lg font-semibold 2xl:text-2xl dark:bg-blue-950'>{bodega.nombre}</h1>
            <article className='bg-blue-200 dark:bg-blue-600 grid grid-cols-12 py-4 place-items-center'>

              <div className='col-span-6'>
                <p className=''>
                  <span className='text-blue-700 dark:text-blue-100 font-bold'>Sucursal: </span>
                  <span className='font-semibold dark:text-yellow-200'>{bodega.sucursal}</span>
                </p>
                <p className=''>
                  <span className='text-blue-700 dark:text-blue-100 font-bold'>UUID: </span>
                  <span className='font-semibold dark:text-yellow-200 uppercase'>{bodega._id}</span>
                </p>
              </div>

              <p className='col-span-2 flex items-center gap-2'>
                <span className='text-blue-700 dark:text-blue-100 font-bold'><LocationIcon /> </span>
                <span className='font-semibold dark:text-yellow-200'>{bodega.direccion}</span>
              </p>
              {
                Array.isArray(bodega?.items) && bodega.items.length !== 0
                  ? (
                    <p className='col-span-2 flex items-center gap-2'>
                      <span className='text-blue-700 dark:text-blue-100 font-bold'><BoxIcon /></span>
                      <span className='font-semibold dark:text-yellow-200'>{bodega.items.length}</span>
                    </p>
                  )
                  : (
                    <p className='col-span-2 flex items-center gap-2'>
                      <span className='text-blue-700 dark:text-blue-100 font-bold'><BoxIcon /></span>
                      <span className='font-semibold dark:text-yellow-200'>0</span>
                    </p>
                  )
              }

              {
                Array.isArray(bodega?.simcards) && bodega.simcards.length !== 0
                  ? (
                    <p className='col-span-2 flex items-center gap-2'>
                      <span className='text-blue-700 dark:text-blue-100 font-bold'><SimcardIcon /> </span>
                      <span className='font-semibold dark:text-yellow-200'>{bodega.simcards.length}</span>
                    </p>
                  )
                  :
                  (
                    <p className='col-span-2 flex items-center gap-2'>
                      <span className='text-blue-700 dark:text-blue-100 font-bold'><SimcardIcon /> </span>
                      <span className='font-semibold dark:text-yellow-200'>0</span>
                    </p>
                  )
              }
            </article>
          </section>
        )
      }

      <div className=''>
        {/* // TODO: Renderizado De Items Si Existen */}
        <section className='' >
          <h3 onClick={handleToggle} className='text-center hover:underline py-2 items-center cursor-pointer dark:text-white'>
            <span>{isExpanded ? '▲' : '▼'}</span> Ver Detalles Items
          </h3>
          {isExpanded && (bodega != null) && (
            <BodegaItemsDetail items={bodega.items} />
          )}
        </section>

        {/* // TODO: Renderizado De Simcards Si Existen */}
        <section className=''>
          <h3 onClick={handleToggleSim} className='text-center hover:underline py-2 items-center cursor-pointer dark:text-white'>
            <span>{isExpandedSim ? '▲' : '▼'}</span> Ver Detalles Simcards
          </h3>

          {
            isExpandedSim && (bodega != null) && (
              <BodSimsDetails simcards={bodega.simcards} />
            )
          }
        </section>
      </div>
    </main>
  )
}
