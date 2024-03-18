import { FilterComponentItems } from '../../components/ui/FilterComponentItems'
import { BottonExportItems, RenderItems } from '../../components/Items'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { useAuth } from '../../Auth/AuthContext'
import { useItems } from '../../hooks/useItems'

export function VerItems (): JSX.Element {
  const { user } = useAuth()
  const company = (user != null) ? user.empresa : ''

  const { items } = useItems({ company })
  const { filteredItems, search, setSearch } = useFiltersItems(items)

  return (
    <>
      <section className='flex justify-around p-2 bg-blue-800'>
        <FilterComponentItems search={search} setSearch={setSearch} />
        <BottonExportItems items={filteredItems} />
      </section>

      <RenderItems items={filteredItems} rol={user?.rol} />

    </>
  )
}
