import { ListItemsComponent } from '../../components/Items/ListItemsComponent'
import { FilterComponentItems, Loading } from '../../components/ui'
import { type ItemsArray } from '../../types/Item'

interface ItemsWithoutBodegaComponentProps {
  items: ItemsArray
  carItems: string[]
  handleAddItem: (id: string) => void
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const ItemsWithoutBodegaComponent: React.FC<ItemsWithoutBodegaComponentProps> =
  ({ items, carItems, handleAddItem, search, setSearch }: ItemsWithoutBodegaComponentProps) => {
    return (
    <section>
      <h3 className="text-center font-semibold border-b-2 border-black pb-1">Items Sin Bodega</h3>
      <header>
        <div className='flex w-full justify-center py-2'>
          <FilterComponentItems search={search} setSearch={setSearch} />
        </div>
        <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-blue-200'>
          <span>Placa</span>
          <span>Nombre</span>
          <span>Agregar</span>
        </p>
      </header>

      <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
        {
          items.length > 0
            ? (<ListItemsComponent items={items} carItems={carItems} handleAddItem={handleAddItem} />)
            : <Loading>Cargando Items Sin Bodega...</Loading>
        }
      </main>
    </section>
    )
  }
