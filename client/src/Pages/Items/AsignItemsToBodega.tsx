import { ItemsSinBodegas, ItemsToAddComponent } from '../../components/Items'
import { useFiltersBodegas, useFiltersItems, useItems } from "../../hooks";
import BodegaSelection from '../../components/Bodega/BodegaSelecComponent'
import { Button, Loading, MessageDisplay } from '../../components/ui';
import { getAllBodegas } from '../../services/Bodegas.services';
import { addItemsToBodega } from '../../services/Item.services';
import { useCallback, useEffect, useState } from 'react';
import { useAuth } from "../../Auth/AuthContext";
import { Bodegas } from '../../types/Bodega';

export function AsignItemsToBodega() {
  const { user } = useAuth()
  const [getDataItem, setDataItem] = useState(false)
  const { items, loading } = useItems({ company: user.empresa, active: getDataItem })
  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(items)

  const [carItems, setCarItems] = useState<string[]>([])
  const [sucursalBodega, setSucursalBodega] = useState('')
  const [bodegas, setBodegas] = useState<Bodegas>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setTimeout(() => {
      void getAllBodegas(user.empresa)
        .then(res => { setBodegas(res) })
    }, 1000)
  }, [])

  const { filteredBodegas, searchBodega, setSearchBodega } = useFiltersBodegas(bodegas)

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
    void addItemsToBodega(sucursalBodega, carItems, user.empresa)
      .then(res => {
        setMessage(res.message)
        setCarItems([])
        setSucursalBodega('')
        setDataItem(!getDataItem)
        setTimeout(() => { setMessage('') }, 4000)
      })
      .catch(err => {
        setError(err.response.data.error as string)
        setTimeout(() => { setError('') }, 4000)
      })
  }

  return (
    <main>
      <h1 className="text-center py-4 text-2xl font-semibold dark:text-white mb-4 bg-blue-200 dark:bg-blue-900">
        Asignar Items a Bodega
      </h1>

      <section className='flex w-full gap-2 px-2'>
        <div className='w-1/3'>{loading ? <Loading>Cargando Items</Loading>
          : <ItemsSinBodegas items={filteredItems} search={searchItems} setSearch={setSearchItems} 
                cartItems={carItems} handleAddItem={handleAddItem} />}
        </div>
        <div className='w-1/3'><ItemsToAddComponent items={items} cartItems={carItems} handleRemoveItem={handleRemoveItem} /></div>
        <div className='w-1/3'><BodegaSelection sucursal={sucursalBodega} setSucursal={setSucursalBodega} bodegas={filteredBodegas}  
          searchBodega={searchBodega} setSearchBodega={setSearchBodega}/></div>
      </section>

      <form onSubmit={handleSubmit} className='w-full flex justify-center'>
        <Button type="submit">Asignar Items a Bodega</Button>
      </form>

      <section className='absolute w-full pt-2 flex items-center justify-center'>
        <MessageDisplay message={message} error={error} />
      </section>

    </main>
  )
}
