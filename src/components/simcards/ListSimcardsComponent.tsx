import { type SimcardWithBodega } from '../../types/Simcard.interfaces'
import { AddIcon, CheckIcon } from '../icons'

interface ProspLisComp {
  simcards: SimcardWithBodega[]
  cartSims: string[]
  handleAddItem: (id: string) => void
}

export function ListItemsComponent ({ simcards, cartSims, handleAddItem }: ProspLisComp): React.ReactNode {
  return (
    simcards.map(sim => (
      sim.bodega === 'No Asignado' && (
        <article key={sim._id} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2' >
          <p className=''>{sim.numero}</p>
          <p className=''>{sim.serial}</p>
          <button onClick={() => { handleAddItem(sim._id) }} className="">
            {
              cartSims.includes(sim._id)
                ? <p className="bg-green-300 rounded-full"><CheckIcon /></p>
                : <p className=""><AddIcon /></p>
            }
          </button>
        </article>
      ))))
}
