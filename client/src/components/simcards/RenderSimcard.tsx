import { SimcardNoBodega } from "../../types/Simcard.interfaces"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'

interface Props {
  simcard: SimcardNoBodega
  bodegaOrigen?: string
}

export function RenderSimcard({ simcard, bodegaOrigen }: Props): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = 
  useSortable({ id: `${simcard._id}`, data: { bodegaOrigen, type: 'simcard', simcard }})

const style = {
  transition,
  transform: CSS.Transform.toString(transform),
}

const cssClasses = "flex h-10 bg-slate-200 p-2 rounded-md text-center pl-10 mb-1"

if (isDragging) {
  return (
    <div ref={setNodeRef} style={{ ...style, cursor: 'grab', opacity: 0.3 }} className={cssClasses} />
  )
}

  return (
    <article ref={setNodeRef} style={style} {...attributes} {...listeners}
      className='no-select flex bg-slate-200 p-2 rounded-md text-center pl-10 mb-1 hover:bg-yellow-200 cursor-pointer hover:font-semibold transition-all'>
      <p className='w-1/3'>{simcard.numero}</p>
      <p className='w-1/3'>{simcard.operador}</p>
      <p className='w-1/3'>{simcard.serial}</p>
    </article>
  )
}
