import { Input, Label } from '../../components/ui'

interface FilterComponentItemsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function FilterComponentItems ({ search, setSearch }: FilterComponentItemsProps): JSX.Element {
  return (
    <section className="flex items-center gap-4">
      <div className='w-[120px]'>
        <Label textColor='dark:text-white'>Filtrar Items: </Label>
      </div>
      <div className='w-[420px] flex'>
        <Input type='text' value={search} onChange={({ target }) => { setSearch(target.value) }} placeholder='Buscar por nombre, placa o serial'/>
      </div>
    </section>
  )
}
