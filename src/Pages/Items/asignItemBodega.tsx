import { FilterComponentItems, MessageDisplay, Loading } from '../../components/ui'
import { ListItemsComponent } from '../../components/Items/ListItemsComponent'
import { useFiltersBodegas } from '../../hooks/useFilterBodegas'
import { getAllBodegas } from '../../services/Bodegas.services'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { getAllItems } from '../../services/Item.services'
import { useCallback, useEffect, useState } from 'react'
import { type ItemsArray } from '../../interfaces/Item'
import { type Bodegas } from '../../interfaces/Bodega'
import { useAuth } from '../../Auth/AuthContext'
import axios from 'axios'
import ItemsToAddComponent from '../../components/Items/ItemsToAddCart'
import BodegaSelectionComponent from '../../components/Bodega/BodegaSelecComponent'

export function AsignarItemBodega (): JSX.Element {
  const { user } = useAuth()
  const company = (user != null) ? user.empresa : ''

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [sendBodega, setSendBodega] = useState('')

  const [items, setItems] = useState<ItemsArray>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  const { filteredItems, search, setSearch } = useFiltersItems(items)
  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

  useEffect(() => {
    setTimeout(() => {
      getAllBodegas(company)
        .then((data) => { setBodegas(data) })
        .catch((error) => {
          const errorString = error.response.data.error
          if (typeof errorString === 'string') {
            setError(errorString)
            setTimeout(() => {
              setError('')
            }, 3000)
          }
        })
    }, 300)

    setTimeout(() => {
      void getAllItems(company)
        .then(data => { setItems(data) })
    }, 600)
  }, [message])

  const carItemsInitial: string[] = []

  const [carItems, setCarItems] = useState(carItemsInitial)

  const handleAddItem = useCallback((id: string) => {
    setCarItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setCarItems(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  const handleSubmit = (e: { preventDefault: () => void }): void => {
    e.preventDefault()
    axios.post('/addItemsToBodega', { sucursal: sendBodega, itemIds: carItems, company })
      .then(res => {
        const messageStr = res.data.message
        if (typeof messageStr === 'string') {
          setMessage(messageStr)
        }
        setCarItems([])
        setSendBodega('')
        setTimeout(() => {
          setMessage('')
        }, 3000)
      })
      .catch(err => {
        const errorStr = err.response.data.error
        if (typeof errorStr === 'string') {
          setError(errorStr)
        }
        setTimeout(() => {
          setError('')
        }, 3000)
      })
  }

  return (
    <main className="w-full">
      <h1 className="text-center py-4 text-2xl font-semibold border bg-blue-800 text-white mb-4">Asignar Items a Bodega</h1>

      <section className="grid grid-cols-3 gap-3 px-4">

        <section>
          <h3 className="text-center font-semibold border-b-2 border-black pb-1">Items Sin Bodega</h3>
          <header>
            <div className='flex w-full justify-center py-2'>
              <FilterComponentItems search={search} setSearch={setSearch} />
            </div>
            <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-blue-200'>
              <span>Placa</span>
              <span>Nombre</span>
              <span>Agregar</span>
            </p>
          </header>

          <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {
              filteredItems.length > 0
                ? (<ListItemsComponent items={filteredItems} carItems={carItems} handleAddItem={handleAddItem} />)
                : <Loading>Cargando Items Sin Bodega...</Loading>
            }
          </main>

        </section>

        <ItemsToAddComponent items={items} carItems={carItems} handleRemoveItem={handleRemoveItem} />

        <section>

          <BodegaSelectionComponent bodegas={filteredBodegas} searchBodega={searchBodega}
            setSearchBodega={setSearchBodega} sendBodega={sendBodega} setSendBodega={setSendBodega} />

          <form onSubmit={handleSubmit} className='w-full flex justify-center'>
            <input type="submit" value="Agregar Items A Bodega" className="bg-blue-400 p-2 rounded-md w-96 hover:bg-blue-500 cursor-pointer text-white font-semibold text-center" id="submit" name="submit" />
          </form>
        </section>

      </section>

      <section className='w-full flex items-center justify-center'>
        <MessageDisplay message={message} error={error} />
      </section>
    </main>
  )
}
