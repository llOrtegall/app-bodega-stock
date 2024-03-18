import { SimcardNoBodega } from '../../types/Simcard.interfaces'
import { DeleteIcon } from '../icons'

export function SimcardAgregada ({ id, simcards, handleRemoveItem, color }: { id: string, simcards: SimcardNoBodega[], handleRemoveItem: (id: string) => void, color: string }) {
  const simcard = simcards?.find(sim => sim._id === id)
  const { _id, numero, serial } = simcard || {}
  return (
    <>
      <main key={_id} className={`grid grid-cols-3 place-items-center ${color} p-1text-black my-1 rounded-lg`}>
        <p>{simcard !== undefined ? simcard.numero : numero}</p>
        <p>{serial !== undefined ? simcard?.serial.slice(-6) : serial}</p>
        <button onClick={() => handleRemoveItem(id)} className={`hover:bg-${color}-400 rounded-full p-1 hover:text-white`}>
          <DeleteIcon />
        </button>
      </main>
    </>
  )
}
