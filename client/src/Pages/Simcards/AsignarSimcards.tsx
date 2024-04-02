import { ListItemsComponent } from '../../components/simcards/ListSimcardsComponent'
import { FilterComponentSimcars } from '../../components/ui/FilterComponentSimcars'
import BodegaSelectionComponent from '../../components/Bodega/BodegaSelecComponent'
import { SimcardsToAddComponent } from '../../components/simcards/SimcarToAddCart'
import { BodegaDataSims, addSimcardsToBodega, simcardsBodegas } from '../../services/Simcards.services'
import { type SimcardWithBodega } from '../../types/Simcard.interfaces'
import { Button, Loading, MessageDisplay } from '../../components/ui'
import { useFilterSimcards, useFiltersBodegas } from '../../hooks'
import { useCallback, useEffect, useState } from 'react'
import { type Bodegas } from '../../types/Bodega'
import { useAuth } from '../../Auth/AuthContext'

export function AsignarSimcards (): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa

  const [simConBodega, setSimConBodega] = useState<SimcardWithBodega[]>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { filteredSimcards, searchSimcard, setSearchSimcard } = useFilterSimcards(simConBodega)
  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  const [sendBodega, setSendBodega] = useState('')

  useEffect(() => {
    void simcardsBodegas(company)
      .then(data => {
        setSimConBodega(data)
      })
      .catch(err => {
        const errorString = err.response.data.error
        if (typeof errorString === 'string') setError(errorString)
      })

    setTimeout(() => {
      void BodegaDataSims(company)
        .then(data => {
          setBodegas(data)
        })
        .catch(err => { setError(err.response.data.error as string) }
        )
    }, 1000)
  }, [message])

  const [cartSims, setCartSims] = useState<string[]>([])

  const handleAddSimcard = useCallback((id: string) => {
    setCartSims(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setCartSims(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    setLoading(true)
    void addSimcardsToBodega(sendBodega, cartSims, company)
      .then(res => {
        setLoading(false)
        setMessage(res.data.message)
        setSimConBodega([])
        setBodegas([])
        setSendBodega('')
        setSearchSimcard('')
        setSearchBodega('')
        setCartSims([])
        setTimeout(() => { setMessage('') }, 3000)
      })
      .catch(err => {
        setLoading(false)
        setError(err.response.data.error as string)
        setTimeout(() => { setError('') }, 3000)
      })
  }

  return (
    <main className=''>
      <h2 className='bg-blue-200 dark:bg-blue-900 dark:text-white text-3xl py-4 w-full text-center font-semibold'>Asignar Simcards a Bodega</h2>

      <section className='grid grid-cols-3 gap-3 px-4'>

        <section>
          <h3 className="text-center font-semibold border-b-2 border-black dark:border-white pb-1 dark:text-white">Simcards Sin Bodega</h3>
          <header>
            <div className='flex w-full justify-center py-2'>
              <FilterComponentSimcars searchSimcard={searchSimcard} setSearchSimcard={setSearchSimcard} />
            </div>
            <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-blue-200'>
              <span>Numero</span>
              <span>Serial</span>
              <span>Agregar</span>
            </p>
          </header>

          <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {
              filteredSimcards.length > 0
                ? (<ListItemsComponent cartSims={cartSims} simcards={filteredSimcards} handleAddItem={handleAddSimcard} />)
                : <Loading>Cargando Items Sin Bodega...</Loading>
            }
          </main>
        </section>

        <SimcardsToAddComponent simcards={simConBodega} cartSims={cartSims} handleRemoveItem={handleRemoveItem} />

        <section>

          <BodegaSelectionComponent bodegas={filteredBodegas} searchBodega={searchBodega}
            setSearchBodega={setSearchBodega} sendBodega={sendBodega} setSendBodega={setSendBodega} />

          <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <Button type="submit">Asignar Simcards a Bodega</Button>
          </form>
        </section>

      </section>

      {loading && <section className='w-full flex items-center justify-center'><Loading>Agregando Items a bodega</Loading></section>}

      <section className='w-full flex items-center justify-center'>
        <MessageDisplay message={message} error={error} />
      </section>

    </main>
  )
}
