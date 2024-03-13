import { useAuth } from '../../Auth/AuthContext'
import { BottonExportItems } from '../../components/Items/ExportExcelItem'
import { RenderItems } from '../../components/Items/RenderItems'
import { FilterComponentItems } from '../../components/ui/FilterComponentItems'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { useItems } from '../../hooks/useItems'

export function VerItems() {
  const { user } = useAuth()
  const company = user?.empresa || ''

  const { items } = useItems(company)
  const { filteredItems, search, setSearch } = useFiltersItems(items)

  return (
    <section className=''>
      <div className='flex justify-around p-2 bg-blue-800'>
        <FilterComponentItems search={search} setSearch={setSearch} />
        <BottonExportItems items={filteredItems}/>
      </div>

      { items && (<RenderItems items={filteredItems} rol={user?.rol} />)}
    </section>
  )
}
