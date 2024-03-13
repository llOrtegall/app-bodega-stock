import { AddIcon, CheckIcon, DeleteIcon } from '../../components/icons'
import { MessageDisplay } from '../../components/ui/MessagesDisplay'
import { getAllBodegas } from "../../services/Bodegas.services";
import { BodegaIntIS } from "../../interfaces/Bodega.Interfaces";
import { ItemWithBodega } from "../../interfaces/Item.Intece";
import { getAllItems } from "../../services/Item.services";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../Auth/AuthContext";
import axios from "axios";
import { useFiltersItems } from '../../hooks/useFilterItems';
import { FilterComponentItems } from '../../components/ui/FilterComponentItems';

export function AsignarItemBodega() {
  const { user } = useAuth();
  const company = user?.empresa || '';
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [items, setItems] = useState<ItemWithBodega>([]);
  const [bodegas, setBodegas] = useState<BodegaIntIS[]>([]);
  const [sendBodega, setSendBodega] = useState<string>('');

  const { filteredItems, search, setSearch } = useFiltersItems(items)

  useEffect(() => {

    setTimeout(() => {
      getAllBodegas(company)
        .then((data) => {
          setBodegas(data)
        })
        .catch((error) => {
          setError(error.message)
        });

    }, 300);

    setTimeout(() => {
      getAllItems(company)
        .then(data => {
          setItems(data)
        })
    }, 600);

  }, [message]);

  const carItemsInitial: string[] = []

  const [carItems, setCarItems] = useState(carItemsInitial)

  const handleAddItem = useCallback((id: string) => {
    setCarItems(prevItems => {
      if (!prevItems.includes(id)) {
        return [...prevItems, id]
      } else {
        return prevItems
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setCarItems(prevItems => {
      return prevItems.filter(item => item !== id)
    })
  }, [])

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    axios.post('/addItemsToBodega', { sucursal: sendBodega, itemIds: carItems, company })
      .then(res => {
        setMessage(res.data.message)
        // Resetear los stados y volver a solicitar la data del useEffect
        setCarItems([])
        setSendBodega('')
        setTimeout(() => {
          setMessage('')
        }, 3000);
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => {
          setError('')
        }, 3000);
      })
  }


  return (
    <div className="w-full">
      <h1 className="text-center py-4 text-2xl font-semibold border bg-blue-800 text-white mb-4">Asignar Items a Bodega</h1>

      <section className="grid grid-cols-3 gap-3 px-4">

        <section className="" style={{ maxHeight: '650px', overflowY: 'auto' }}>
          <h3 className="text-center font-semibold border-b-2 border-black pb-1">Items Sin Bodega</h3>
          <header>
            <div className='flex w-full justify-center py-2'>
              <FilterComponentItems search={search} setSearch={setSearch} />
            </div>
            <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-blue-200'>
              <span>Placa</span>
              <span>Nombre</span>
              <span>Agregar</span>
            </p>
          </header>

          {
            filteredItems.map(item => (
              item.bodega === "No Asignado" && (
                <article key={item._id} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2' >
                  <p className=''>{item.placa}</p>
                  <p className=''>{item.nombre}</p>
                  <button onClick={() => handleAddItem(item._id)} className="">
                    {
                      carItems.includes(item._id) ?
                        <p className="bg-green-300 rounded-full">
                          <CheckIcon />
                        </p>
                        :
                        <p className="">
                          <AddIcon />
                        </p>
                    }
                  </button>
                </article>
              )
            ))
          }
        </section>

        <article className="" style={{ maxHeight: '650px', overflowY: 'auto' }}>
          <h3 className="text-center font-semibold border-b-2 border-black pb-1">Items Que Se Agregarán a Bodega</h3>
          <header>
            <p className='flex justify-between px-4 py-2 border rounded-md font-semibold my-2 bg-yellow-200'>
              <span>Placa</span>
              <span>Nombre</span>
              <span>Eliminar</span>
            </p>
          </header>
          {
            carItems.map(itemAdd => (
              <article key={itemAdd} className='flex justify-between px-6 py-2 border rounded-md font-semibold my-2'>
                <p className=''>
                  {items.find(i => i._id === itemAdd)?.placa}
                </p>
                <p className=''>
                  {items.find(i => i._id === itemAdd)?.nombre}
                </p>
                <button onClick={() => handleRemoveItem(itemAdd)} className="hover:text-red-600">
                  <DeleteIcon />
                </button>
              </article>
            ))
          }
        </article>

        <article className="">

          <h3 className="text-center font-semibold border-b-2 border-black pb-1">Selección De Bodega</h3>
          <header className="w-full">
            <p className='flex justify-center px-4 py-2 border rounded-md font-semibold my-2 bg-green-300'>
              <span>Sucursal - Bodega</span>
            </p>
          </header>

          <select className="bg-slate-200 rounded-md shadow-lg p-2 w-full flex flex-col gap-2 mb-4"
            name="sucursal" id="sucursal" value={sendBodega} onChange={ev => setSendBodega(ev.target.value)}>
            <option value="">Seleccione una bodega</option>
            {
              bodegas.map(bodega => (
                <option key={bodega._id} value={bodega.sucursal} className='justify-normal'>
                  {bodega.sucursal} | {bodega.nombre}
                </option>
              ))
            }
          </select>

          <form onSubmit={handleSubmit}>
            <input type="submit" value="Agregar Items A Bodega" className="bg-blue-400 p-2 rounded-md w-full hover:bg-blue-500 cursor-pointer text-white font-semibold text-center" id="submit" name="submit" />
          </form>
        </article>

      </section>

      <MessageDisplay message={message} error={error} />
    </div>
  );
}