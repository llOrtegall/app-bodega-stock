import { Input, Label } from '../../components/ui'

interface PropFilteBodega {
  searchBodega: string
  setSearchBodega: React.Dispatch<React.SetStateAction<string>>
}

export function FilterComponentBodegas ({ searchBodega, setSearchBodega }: PropFilteBodega): JSX.Element {
  return (
    <section className="flex min-w-64 items-center gap-4">
      <Label textColor='dark:text-white'>Filtrar Bodegas: </Label>
      <Input type='text' value={searchBodega} onChange={({ target }) => { setSearchBodega(target.value) }}
        placeholder='Buscar Por Sucursal o Nombre de Bodega...' />
    </section>
  )
}
