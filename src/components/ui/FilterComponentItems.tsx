interface FilterComponentItemsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function FilterComponentItems ({ search, setSearch }: FilterComponentItemsProps): JSX.Element {
  return (
    <section className="flex min-w-64 items-center gap-4">
      <h3 className='font-semibold text-black'>Filtrar Items: </h3>
      <input type='text' value={search} onChange={({ target }) => { setSearch(target.value) }}
        placeholder='Buscar por nombre, placa o serial'
        className='w-96 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent bg-blue-100 text-blue-800 font-semibold'
      />
    </section>
  )
}
