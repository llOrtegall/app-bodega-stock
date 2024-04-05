import NavLinkItem from './LinkComponent';

interface ArticulosProps {
  rol: string | undefined;
  close: (value: string | null) => void;
}

export function Articulos({ rol, close }: ArticulosProps) {

  const items = [
    { id: 1, link: "/items/verItems", title: "Ver Items", validate: false },
    { id: 2, link: "/items/crearItems", title: "Crear Items", validate: true },
    { id: 3, link: "/items/asignarItems", title: "Asginar Items", validate: true }
  ]


  return (
    <article className="absolute -left-10 top-9 w-44">
      <ul className=' bg-slate-200 rounded-b-lg dark:bg-slate-950 justify-around dark:text-white pt-2'>
        <li className=''>
          {
            items.map((item, index) => (
              <NavLinkItem key={index} link={item.link} title={item.title} rol={rol} fun={close} validateRol={item.validate} />
            ))
          }
        </li>
      </ul>
    </article>
  )
}
