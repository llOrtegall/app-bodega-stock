import { type ItemsArray } from '../interfaces/Item'
import { useCallback, useEffect, useState } from 'react'
import { getAllItems } from '../services/Item.services'

interface useItemsProps {
  items: ItemsArray
  loading: boolean
  search: string
  error: any
  setSearch: (search: string) => void
  fetchItems: () => void
}

export function useItems ({ company }: { company: string }): useItemsProps {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ItemsArray>([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const fetchItems = useCallback(() => {
    setLoading(true)
    getAllItems(company)
      .then(data => { setItems(data) })
      .catch(error => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setError(error)
      })
      .finally(() => { setLoading(false) })
  }, [company])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return { search, setSearch, loading, error, fetchItems, items }
}
