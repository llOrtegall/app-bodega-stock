import { getAllItems } from '../services/Item.services'
import { type ItemsArray } from '../types/Item'
import { useEffect, useState } from 'react'

interface Props {
  company: string
}

interface UseItems {
  loading: boolean
  error: string
  items: ItemsArray
}

export function useItems ({ company }: Props): UseItems {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ItemsArray>([])
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    void getAllItems(company)
      .then(items => {setItems(items); setLoading(false)}      )
      .catch((error) => {
        setError(error as string)
        setLoading(false)
      })
      .finally(() => { setLoading(false) })
  }, [])

  return { loading, error, items }
}
