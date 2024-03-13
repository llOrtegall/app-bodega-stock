import { getAllBodegas } from "../../services/Bodegas.services";
import { BodegaInt } from "../../interfaces/Bodega.Interfaces";
import { MessageDisplay } from '../../components/ui/MessagesDisplay'
import { AddIcon } from '../../components/icons'
import { useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import { getAllItems } from "../../services/Item.services";
import { ItemWithBodega } from "../../interfaces/Item.Intece";

export function AsignarItemBodega() {
  const { user } = useAuth();
  const company = user?.empresa || '';
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [items, setItems] = useState<ItemWithBodega>([]);
  const [bodegas, setBodegas] = useState<BodegaInt[]>([]);

  useEffect(() => {
    getAllBodegas(company)
      .then((data) => {
        setBodegas(data)
      })

    setTimeout(() => {
      getAllItems(company)
        .then(data => {
          setItems(data)
        })
    }, 300);

  }, []);


  return (
    <div>
      <h1>Asignar Item a Bodega</h1>

      <section
        className="bg-slate-200 rounded-md shadow-lg p-2 min-w-96 flex flex-col gap-2 mb-4" style={{ maxHeight: '250px', overflowY: 'auto' }}>
        {
          items.map(item => (
            item.bodega === "No Asignado" && (
              <article key={item._id} className='grid grid-cols-6 bg-slate-300 px-2 py-1 rounded-md hover:bg-blue-200'>
                <p className='col-span-1'>{item.placa}</p>
                <p className='col-span-4 overflow-ellipsis text-center overflow-hidden'>{item.nombre}</p>
                <button>
                  <AddIcon />
                </button>
              </article>
            )
          ))
        }
      </section>

      <MessageDisplay message={message} error={error} />
    </div>
  );
}