import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { Item } from "../../types/Bodega"

interface Props {
  item: Item
  bodegaOrigen?: string
  cart?: string[]
}

export function RenderItems({ item, bodegaOrigen, cart }: Props): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = 
  useSortable({ id: `${item._id}`, data: { bodegaOrigen, type: 'item', item }})

const style = {
  transition,
  transform: CSS.Transform.toString(transform),
}

const cssClasses = "flex h-10 bg-sky-700 p-2 rounded-md text-center pl-10 mb-1"

if (isDragging) {
  return (
    <div ref={setNodeRef} style={{ ...style, cursor: 'grab', opacity: 0.3 }} className={cssClasses} />
  )
}

  return (
    <article ref={setNodeRef} style={style} {...attributes} {...listeners}
      className={`${cart?.includes(item._id) ? 'bg-yellow-200' : 'bg-slate-200 dark:bg-slate-500 dark:text-white'} 
      no-select flex p-2 rounded-md text-center h-10 mb-1 hover:bg-yellow-200 dark:hover:bg-yellow-200 dark:hover:text-black cursor-pointer hover:font-semibold transition-all`}>
      <p className='w-1/3'>{item.nombre}</p>
      <p className='w-1/3'>{item.placa}</p>
      <p className='w-1/3'>{item.serial}</p>
    </article>
  )
}
