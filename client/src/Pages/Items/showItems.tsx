import { FilterComponentItems } from '../../components/ui/FilterComponentItems'
import { BottonExportItems, RenderItems } from '../../components/Items'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { useAuth } from '../../Auth/AuthContext'
import { useItems } from '../../hooks/useItems'
import { Loading } from '../../components/ui'

export function VerItems(): JSX.Element {
  const { user } = useAuth()
  const company = user?.company!

  const { items, loading } = useItems({ company })
  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(items)

  return (
    loading
      ? <section className='mt-12'><Loading >Cargando Items</Loading></section>
      :
      <section>
        <article className='flex justify-around py-2 bg-blue-300 dark:bg-blue-950'>
          <FilterComponentItems search={searchItems} setSearch={setSearchItems} />
          <BottonExportItems items={filteredItems} />
        </article>
        <RenderItems items={filteredItems} rol={user?.process!} />
      </section>
  )
}
