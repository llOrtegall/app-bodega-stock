import { Input, Label } from '../../components/ui'

interface FilterComponentItemsProps {
  search: string
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

export function FilterComponentItems ({ search, setSearch }: FilterComponentItemsProps): JSX.Element {
  return (
    <section className="flex min-w-64 items-center gap-4">
      <Label textColor=''>Filtrar Items: </Label>
      <Input type='text' value={search} onChange={({ target }) => { setSearch(target.value) }}
        placeholder='Buscar por nombre, placa o serial'/>
    </section>
  )
}
