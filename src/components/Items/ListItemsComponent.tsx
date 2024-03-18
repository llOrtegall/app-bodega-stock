import { type ItemsArray } from '../../types/Item'
import { AddIcon, CheckIcon } from '../icons'

interface ProspLisComp {
  items: ItemsArray
  carItems: string[]
  handleAddItem: (id: string) => void
}

export function ListItemsComponent ({ items, carItems, handleAddItem }: ProspLisComp): React.ReactNode {
  return (
    items.map(item => (
      item.bodega === 'No Asignado' && (
        <article key={item._id} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2' >
          <p className=''>{item.placa}</p>
          <p className=''>{item.nombre}</p>
          <button onClick={() => { handleAddItem(item._id) }} className="">
            {
              carItems.includes(item._id)
                ? <p className="bg-green-300 rounded-full"><CheckIcon /></p>
                : <p className=""><AddIcon /></p>
            }
          </button>
        </article>
      ))))
}
