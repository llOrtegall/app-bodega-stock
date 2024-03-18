import { ItemWithBodega } from "../../interfaces/Item";
import { AddIcon, CheckIcon } from "../icons";
import { Loading } from "../ui";

export function ListItemsComponent({ items, carItems, handleAddItem }:
  { items: ItemWithBodega, carItems: string[], handleAddItem: (id: string) => void }) {
  return (
    items.length > 0
      ? (items.map(item => (
        item.bodega === "No Asignado" && (
          <article key={item._id} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2' >
            <p className=''>{item.placa}</p>
            <p className=''>{item.nombre}</p>
            <button onClick={() => handleAddItem(item._id)} className="">
              {
                carItems.includes(item._id)
                  ? <p className="bg-green-300 rounded-full"><CheckIcon /></p>
                  : <p className=""><AddIcon /></p>
              }
            </button>
          </article>
        ))))
      : <Loading> Cargando Items... </Loading>
  )
}