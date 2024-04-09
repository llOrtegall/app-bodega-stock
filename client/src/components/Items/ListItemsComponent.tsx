import { type ItemsArray } from '../../types/Item'
import { AddIcon, CheckIcon } from '../icons'

interface ProspLisComp {
  items: ItemsArray
}

export function ListItemsComponent ({ items }: ProspLisComp): React.ReactNode {
  return (
    items.map(item => (
      item.bodega === 'No Asignado' && (
        <article key={item._id} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2' >
          <p className=''>{item.placa}</p>
          <p className=''>{item.nombre}</p>
          <button className="hover:text-green-500">
            {/* onClick={() => { handleAddItem(item._id) }}
              carItems.includes(item._id)
                ? <p className="bg-green-300 rounded-full dark:text-black"><CheckIcon /></p>
                : <p className=""><AddIcon /></p>
      */}
          </button>
        </article>
      ))))
}
