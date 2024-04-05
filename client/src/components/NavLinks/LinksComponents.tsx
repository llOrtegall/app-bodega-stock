import NavLinkItem from './ComponentLink';

interface Props {
  rol: string | undefined;
  close: (value: string | null) => void;
}

const classStyles = "absolute -left-14 top-7 w-44 bg-slate-200 rounded-b-lg pb-1"

function Articulos({ rol, close }: Props) {
  const items = [
    { id: 1, link: "/items/verItems", title: "Ver Items", validate: false },
    { id: 2, link: "/items/crearItems", title: "Crear Items", validate: true },
    { id: 3, link: "/items/asignarItems", title: "Asginar Items", validate: true }
  ]

  return (
    <ul className={classStyles}>
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
    <ul className={classStyles}>
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
    <ul className={classStyles}>
      {items.map(item => (<NavLinkItem key={item.id} link={item.link} title={item.title} rol={rol} fun={close} validateRol={item.validate} />))}
    </ul>
  )
}

export { Articulos, Bodegas, Simcards }

