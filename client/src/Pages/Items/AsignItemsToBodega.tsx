import { ItemsSinBodegas, ItemsToAddComponent } from '../../components/Items'
import BodegaSelection from '../../components/Bodega/BodegaSelecComponent'

import { getAllBodegas } from '../../services/Bodegas.services';

import { useAuth } from "../../Auth/AuthContext";
import { Loading } from '../../components/ui';
import { useFiltersItems, useItems } from "../../hooks";
import { useCallback, useEffect, useState } from 'react';
import { Bodegas } from '../../types/Bodega';

export function AsignItemsToBodega() {
  // const { user } = useAuth()
  // const company = user.empresa

  // const [sendBodega, setSendBodega] = useState('')
  // const [fechData, setFechData] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const [message, setMessage] = useState('')
  // const [error, setError] = useState('')

  // const { items, filteredBodegas, filteredItems, searchItems, searchBodega, setSearchItems, setSearchBodega } = useItemsAndBodegas(company, fechData)

  // const [carItems, setCarItems] = useState<string[]>([])

  // const handleAddItem = useCallback((id: string) => {
  //   setCarItems(prevItems => {
  //     if (!prevItems.includes(id)) {
  //       return [...prevItems, id]
  //     } else {
  //       return prevItems
  //     }
  //   })
  // }, [])

  // const handleRemoveItem = useCallback((id: string) => {
  //   setCarItems(prevItems => {
  //     return prevItems.filter(item => item !== id)
  //   })
  // }, [])

  // const handleSubmit = (e: { preventDefault: () => void }): void => {
  //   e.preventDefault()
  //   setLoading(true)
  //   void addItemsToBodega(sendBodega, carItems, company)
  //     .then(res => {
  //       setMessage(res.message)
  //       setCarItems([])
  //       setLoading(false)
  //       setSendBodega('')
  //       setFechData(!fechData)
  //       setTimeout(() => { setMessage('') }, 4000)
  //     })
  //     .catch(err => {
  //       setError(err.response.data.error as string)
  //       setLoading(false)
  //       setTimeout(() => { setError('') }, 4000)
  //     })
  // }

  // return (
  //   <main className="w-full">
  //     <h1 className="text-center py-4 text-2xl font-semibold dark:text-white mb-4 bg-blue-200 dark:bg-blue-900">
  //       Asignar Items a Bodega
  //     </h1>

  //     <section className="grid grid-cols-3 gap-3 px-4">

  //       <ItemsSinBodegas items={filteredItems} carItems={carItems}
  //         handleAddItem={handleAddItem} search={searchItems} setSearch={setSearchItems} />

  //       <ItemsToAddComponent items={items} carItems={carItems} handleRemoveItem={handleRemoveItem} />

  //       <section>

  //         <BodegaSelection bodegas={filteredBodegas} searchBodega={searchBodega}
  //           setSearchBodega={setSearchBodega} sendBodega={sendBodega} setSendBodega={setSendBodega} />

  //         <form onSubmit={handleSubmit} className='w-full flex justify-center'>
  //           <Button type="submit">Asignar Items a Bodega</Button>
  //         </form>
  //       </section>

  //     </section>

  //     {loading && <section className='w-full flex items-center justify-center'><Loading>Agregando Items a bodega</Loading></section>}

  //     <section className='w-full flex items-center justify-center'>
  //       <MessageDisplay message={message} error={error} />
  //     </section>
  //   </main>
  // )
  const { user } = useAuth()
  const { items, loading } = useItems({ company: user.empresa })
  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(items)

  const [carItems, setCarItems] = useState<string[]>([])
  const [bodegas, setBodegas] = useState<Bodegas>([])

  useEffect(() => {
    setTimeout(() => {
      void getAllBodegas(user.empresa)
      .then(res => { setBodegas(res) })
    }, 1000)
  }, [])

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

  return (
    <main>
      <h1 className="text-center py-4 text-2xl font-semibold dark:text-white mb-4 bg-blue-200 dark:bg-blue-900">
        Asignar Items a Bodega
      </h1>

      <section className='flex w-full gap-2 px-2'>
        <div className='w-1/3'>{loading ? <Loading>Cargando Items</Loading> 
          : <ItemsSinBodegas items={filteredItems} search={searchItems} setSearch={setSearchItems} cartItems={carItems} handleAddItem={handleAddItem} />}
        </div>
        <div className='w-1/3'><ItemsToAddComponent items={items} cartItems={carItems} handleRemoveItem={handleRemoveItem} /></div>
        <div className='w-1/3'><BodegaSelection bodegas={bodegas} /></div>
      </section>
    </main>
  )
}
