import { Input, Label } from '../../components/ui'

interface FilterComponentSimcardProps {
  searchSimcard: string
  setSearchSimcard: React.Dispatch<React.SetStateAction<string>>
}

export function FilterComponentSimcars ({ searchSimcard, setSearchSimcard }: FilterComponentSimcardProps): JSX.Element {
  return (
    <section className="flex min-w-64 items-center gap-4">
      <Label textColor=''>Filtrar Items: </Label>
      <Input type='text' value={searchSimcard} onChange={({ target }) => { setSearchSimcard(target.value) }}
        placeholder='Buscar por nombre, placa o serial'/>
    </section>
  )
}
