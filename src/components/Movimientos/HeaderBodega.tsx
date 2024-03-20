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
    <article className='flex flex-col bg-slate-700 rounded-md'>

      <section className='flex justify-around items-center py-2'>
        <h1 className='text-2xl font-bold uppercase text-white'>{children}</h1>
        <form className="flex items-center gap-2" onSubmit={funGetBodega}>
          <Label textColor='text-white'>Sucursal Bodega:</Label>
          <Input type="text" value={valueBodega} onChange={ev => { searBodega(ev.target.value) }}
            placeholder="40001 | 34545" />
          <Button type='submit'>Buscar Sucursal</Button>
        </form>
      </section>

      <section className="flex justify-around pb-4 text-white">
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
