import { ItemsWithoutBodegaComponent, ItemsToAddComponent } from '../../components/Items'
import BodegaSelectionComponent from '../../components/Bodega/BodegaSelecComponent'
import { useItemsAndBodegas } from '../../hooks/useItemAndBodegas'
import { MessageDisplay } from '../../components/ui'
import { useAuth } from '../../Auth/AuthContext'
import { useCallback, useState } from 'react'
import axios from 'axios'

export function AsignarItemBodega (): JSX.Element {
  const { user } = useAuth()
  const company = (user != null) ? user.empresa : ''

  const [sendBodega, setSendBodega] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { items, filteredBodegas, filteredItems, search, searchBodega, setSearch, setSearchBodega } = useItemsAndBodegas(company)

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

        <ItemsWithoutBodegaComponent items={filteredItems} carItems={carItems}
          handleAddItem={handleAddItem} search={search} setSearch={setSearch} />

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
