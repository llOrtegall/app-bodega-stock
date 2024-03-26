import { type ItemsArray } from '../types/Item'
import { useEffect, useState } from 'react'
import { getAllItems } from '../services/Item.services'

interface useItemsProps {
  items: ItemsArray
  error: string
  loading: boolean
}

export function useItems ({ company }: { company: string }): useItemsProps {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ItemsArray>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    void getAllItems(company)
      .then((items) => {
        setItems(items)
        setLoading(false)
      })
      .catch((error) => {
        setError(error as string)
        setLoading(false)
      })
      .finally(() => { setLoading(false) })
  }, [])

  return { loading, error, items }
}
