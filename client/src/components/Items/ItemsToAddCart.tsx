import { type ItemsArray } from '../../types/Item'
import { DeleteIcon } from '../icons'

interface Props {
  items: ItemsArray
}

const ItemsToAddComponent = ({ items }: Props) => {
  return (
    <section>
      <h3 className="text-center dark:text-white font-semibold border-b-2 border-black dark:border-white pb-1">Items Que Se Agregarán a Bodega</h3>
      <header>
        <div className='pb-14'></div>
        <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-yellow-200'>
          <span>Placa</span>
          <span>Nombre</span>
          <span>Eliminar</span>
        </p>
      </header>
      <main style={{ maxHeight: '550px', overflowY: 'auto' }}>
        {/*
          carItems.map(itemAdd => (
            <article key={itemAdd} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2 dark:text-white'>
              <p className=''>
                {items.find(i => i._id === itemAdd)?.placa}
              </p>
              <p className=''>
                {items.find(i => i._id === itemAdd)?.nombre}
              </p>
              <button onClick={() => { handleRemoveItem(itemAdd) }} className="hover:text-red-600">
                <DeleteIcon />
              </button>
            </article>
          ))
        */}
      </main>
    </section>
  )
}

export default ItemsToAddComponent