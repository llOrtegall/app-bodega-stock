import { Input, Label } from '../../components/ui'

interface FilterComponentItemsProps {
  setSearch: React.Dispatch<React.SetStateAction<string>>
  search: string
}

export function FilterComponentItems({ search, setSearch }: FilterComponentItemsProps): JSX.Element {
  return (
    <section>
      <Label>Filtrar Items: </Label>
      <Input type='text' value={search}
        onChange={ target => setSearch(target.target.value)}
        placeholder='Buscar por nombre, placa o serial' />
    </section>
  )
}
