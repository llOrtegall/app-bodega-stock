import { SimcardNoBodega } from "../../types/Simcard.interfaces"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

interface Props {
  simcard: SimcardNoBodega
  bodegaOrigen?: string
  cart?: string[]
}

export function RenderSimcard({ simcard, bodegaOrigen, cart }: Props): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = 
  useSortable({ id: `${simcard._id}`, data: { bodegaOrigen, type: 'simcard', simcard }})

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
      className={`${simcard._id === cart?.find(i => i) ? 'bg-yellow-200' : 'bg-slate-200'} 
      no-select flex p-2 rounded-md text-center h-10 pl-10 mb-1 hover:bg-yellow-200 cursor-pointer hover:font-semibold transition-all`}>
      <p className='w-1/3'>{simcard.numero}</p>
      <p className='w-1/3'>{simcard.operador}</p>
      <p className='w-1/3'>{simcard.serial}</p>
    </article>
  )
}
