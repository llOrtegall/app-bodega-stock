import { SimcardNoBodega } from "../../types/Simcard.interfaces"

interface Props {
  simcard: SimcardNoBodega
}

export function RenderSimcard({ simcard }: Props): JSX.Element {
  return (
    <article className='no-select flex bg-slate-200 p-2 rounded-md text-center pl-10 mb-1 hover:bg-yellow-200 cursor-pointer hover:font-semibold transition-all'>
      <p className='w-1/3'>{simcard.numero}</p>
      <p className='w-1/3'>{simcard.operador}</p>
      <p className='w-1/3'>{simcard.serial}</p>
    </article>
  )
}
