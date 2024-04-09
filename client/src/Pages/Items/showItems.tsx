import { FilterComponentItems } from '../../components/ui/FilterComponentItems'
import { BottonExportItems, RenderItems } from '../../components/Items'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { useAuth } from '../../Auth/AuthContext'
import { useItems } from '../../hooks/useItems'
import { Loading } from '../../components/ui'

export function VerItems(): JSX.Element {
  const { user } = useAuth()
  const company = user.empresa

  const { items, loading } = useItems({ company })
  const { filteredItems, searchItems, setSearchItems } = useFiltersItems(items)

  return (
    loading
      ? (<section className='mt-12'><Loading >Cargando Items</Loading></section>)
      : (
        <>
          <section className='flex justify-around p-2 bg-blue-300 dark:bg-blue-950'>
            <FilterComponentItems search={searchItems} setSearch={setSearchItems} />
            <div className='w-[250px]'>
              <BottonExportItems items={filteredItems} />
            </div>
          </section>
          <RenderItems items={filteredItems} rol={user?.rol} />
        </>
      )

  )
}
