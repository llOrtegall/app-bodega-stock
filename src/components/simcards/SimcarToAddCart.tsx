import { type SimcardWithBodega } from '../../types/Simcard.interfaces'
import { DeleteIcon } from '../icons'

interface ItemsToAddComponentProps {
  simcards: SimcardWithBodega[]
  cartSims: string[]
  handleRemoveItem: (id: string) => void
}

export const SimcardsToAddComponent: React.FC<ItemsToAddComponentProps> = ({ simcards, cartSims, handleRemoveItem }: ItemsToAddComponentProps) => {
  return (
    <section>
      <h3 className="text-center font-semibold border-b-2 border-black pb-1">Simcards Que Se Agregarán a Bodega</h3>
      <header>
        <div className='pb-14'></div>
        <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-yellow-200'>
          <span>Placa</span>
          <span>Nombre</span>
          <span>Eliminar</span>
        </p>
      </header>
      <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
        {
          cartSims.map(itemAdd => (
            <article key={itemAdd} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2'>
              <p className=''>
                {simcards.find(i => i._id === itemAdd)?.numero}
              </p>
              <p className=''>
                {simcards.find(i => i._id === itemAdd)?.serial}
              </p>
              <button onClick={() => { handleRemoveItem(itemAdd) }} className="hover:text-red-600">
                <DeleteIcon />
              </button>
            </article>
          ))
        }
      </main>
    </section>
  )
}
