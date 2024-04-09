import { ListItemsComponent } from './ListItemsComponent'
import { FilterComponentItems, Loading } from '../ui'
import { type ItemsArray } from '../../types/Item'

interface Props {
  items: ItemsArray
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const ItemsSinBodegas = ({ items, search, setSearch }: Props) => {
  return (
    <section className='dark:text-white'>
      <h3 className="text-center font-semibold border-b-2 border-black dark:border-white pb-1">Items Sin Bodega</h3>
      <header>
         <div className='flex w-full justify-center py-2'>
          <FilterComponentItems search={search} setSearch={setSearch} />
        </div>
        <p className='flex justify-between px-4 py-2 rounded-md font-semibold my-2 bg-blue-200 dark:bg-blue-700 '>
          <span>Placa</span>
          <span>Nombre</span>
          <span>Agregar</span>
        </p>
      </header>

      <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
        {
          items.length > 0
            ? (<ListItemsComponent items={items} />)
            : <Loading>Cargando Items Sin Bodega...</Loading>
      }
      </main>
    </section>
  )
}

export default ItemsSinBodegas
