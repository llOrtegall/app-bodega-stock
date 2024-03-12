import { useAuth } from '../../Auth/AuthContext'
import { BottonExportItems } from '../../components/Items/ExportExcelItem'
import { RenderItems } from '../../components/Items/RenderItems'
import { useFiltersItems } from '../../hooks/useFilterItems'
import { useItems } from '../../hooks/useItems'

export function VerItems() {
  const { user } = useAuth()
  const company = user?.empresa || ''

  const { items } = useItems(company)
  const { filteredItems, search, setSearch } = useFiltersItems(items)

  return (
    <section className=''>
      <div className='flex items-center justify-center gap-4 p-2 bg-blue-800'>
        <h3 className='font-semibold text-white'>Filtrar Items: </h3>
        <input
          type='text'
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder='Buscar por nombre, placa o serial'
          className='w-96 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent bg-blue-100 text-blue-800 font-semibold'
        />
        <BottonExportItems items={filteredItems}/>
      </div>

      { items && (<RenderItems items={filteredItems} rol={user?.rol} />)}
    </section>
  )
}
