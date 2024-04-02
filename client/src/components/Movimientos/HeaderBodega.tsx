import { type BodegaWithItems } from '../../types/Bodega'
import { Button, Input, Label } from '../ui'

interface HeaderBodegaProps {
  bodega: BodegaWithItems
  funGetBodega: (ev: { preventDefault: () => void }) => void
  valueBodega: string
  searBodega: React.Dispatch<React.SetStateAction<string>>
  children: string
}

export function HeaderBodega ({ funGetBodega, valueBodega, searBodega, bodega, children }: HeaderBodegaProps): JSX.Element {
  return (
    <article className='flex flex-col bg-slate-300 dark:bg-dark-tremor-brand-muted dark:text-white rounded-md'>

      <section className='flex justify-around items-center py-2'>
        <h1 className='text-md font-bold uppercase 2xl:text-xl'>{children}</h1>
        <form className="flex items-center gap-2 text-xs 2xl:text-xl" onSubmit={funGetBodega}>
          <div>
            <Label textColor=''>Sucursal Bodega:</Label>
          </div>
          <div>
            <Input type="text" value={valueBodega} onChange={ev => { searBodega(ev.target.value) }} placeholder="40001 | 34545" />
          </div>
          <div>
            <Button type='submit'>Buscar Sucursal</Button>
          </div>
        </form>
      </section>

      <section className="flex justify-around pb-4 text-xs 2xl:text-base">
        <p className="font-semibold">Nombre:</p>
        <p className="font-bold">{bodega?.nombre}</p>
        <p className="font-semibold">Direccion:</p>
        <p className="font-bold">{bodega?.direccion}</p>
        <p className="font-semibold">Sucursal:</p>
        <p className="font-bold">{bodega?.sucursal}</p>
      </section>

    </article>
  )
}
