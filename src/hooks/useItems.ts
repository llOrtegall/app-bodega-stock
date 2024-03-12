import { useCallback, useEffect, useState } from 'react'
import { getAllItems } from '../services/Item.services'
import { ItemWithBodega } from '../interfaces/Item.Intece'

export function useItems (company: string) {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<ItemWithBodega>([])
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  const fetchItems = useCallback(() => {
    setLoading(true)
    getAllItems(company)
      .then(data => setItems(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [company])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return { search, setSearch, loading, error, fetchItems, items }
}
