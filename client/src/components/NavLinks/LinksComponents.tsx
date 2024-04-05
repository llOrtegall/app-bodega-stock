import NavLinkItem from './ComponentLink';

interface Props {
  rol: string | undefined;
  close: (value: string | null) => void;
}

function Articulos({ rol, close }: Props) {
  const items = [
    { id: 1, link: "/items/verItems", title: "Ver Items", validate: false },
    { id: 2, link: "/items/crearItems", title: "Crear Items", validate: true },
    { id: 3, link: "/items/asignarItems", title: "Asginar Items", validate: true }
  ]

  return (
    <ul className='absolute -left-12 top-7 xl:top-9 1xl:top-10 2xl:top-12 3xl:top-14 w-40 xl:w-48 3xl:w-56 bg-slate-200 rounded-b-lg pb-1 text-sm xl:text-base 1xl:text-lg 2xl:text-lg 3xl:text-2xl'>
      {items.map(item => <NavLinkItem key={item.id} link={item.link} title={item.title} rol={rol} fun={close} validateRol={item.validate} />)}
    </ul>
  )
}

function Bodegas({ rol, close }: Props) {
  const items = [
    { id: 1, link: "/bodega/verBodegas", title: "Ver Bodegas", validate: false },
    { id: 2, link: "/bodega/crearBodega", title: "Crear Bodega", validate: true },
    { id: 3, link: "/bodega/crearMovimiento", title: "Crear Movimiento", validate: true }
  ]

  return (
    <ul className='absolute -left-12 top-7 xl:top-9 1xl:top-10 2xl:top-12 3xl:top-14 w-40 xl:w-48 2xl:w-52 3xl:w-72 bg-slate-200 rounded-b-lg pb-1 text-sm xl:text-base 1xl:text-lg 2xl:text-lg 3xl:text-2xl'>
      {items.map(item => <NavLinkItem key={item.id} link={item.link} title={item.title} rol={rol} fun={close} validateRol={item.validate} />)}
    </ul>
  )
}

function Simcards({ rol, close }: Props) {
  const items = [
    { id: 1, link: "/simcards/verSimcards", title: "Ver Simcards", validate: false },
    { id: 2, link: "/simcards/crearSimcard", title: "Crear Simcards", validate: true },
    { id: 3, link: "/simcards/asignarSimcards", title: "Asignar Simcards", validate: true },
    { id: 4, link: "/simcards/crearMovimiento", title: "Crear Mov Sims", validate: true }
  ]

  return (
    <ul className='absolute -left-12 top-7 xl:top-9 1xl:top-10 2xl:top-12 3xl:top-14 w-40 xl:w-48 2xl:w-52 3xl:w-72 bg-slate-200 rounded-b-lg pb-1 text-sm xl:text-base 1xl:text-lg 2xl:text-lg 3xl:text-2xl'>
      {items.map(item => (<NavLinkItem key={item.id} link={item.link} title={item.title} rol={rol} fun={close} validateRol={item.validate} />))}
    </ul>
  )
}

export { Articulos, Bodegas, Simcards }

