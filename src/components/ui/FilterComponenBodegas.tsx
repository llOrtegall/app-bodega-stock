export function FilterComponentBodegas({ searchBodega, setSearchBodega }: { searchBodega: string, setSearchBodega: React.Dispatch<React.SetStateAction<string>> }) {

  return (
    <section className="flex min-w-64 items-center gap-4">
      <h3 className='font-semibold text-black'>Filtrar Bodegas: </h3>
      <input type='text' value={searchBodega} onChange={({ target }) => setSearchBodega(target.value)}
        placeholder='Buscar Por Sucursal o Nombre de Bodega...'
        className='w-96 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent bg-blue-100 text-blue-800 font-semibold'
      />
    </section>
  )
}