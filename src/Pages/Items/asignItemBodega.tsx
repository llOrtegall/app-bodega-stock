import { getAllBodegas } from "../../services/Bodegas.services";
import { BodegaInt } from "../../interfaces/Bodega.Interfaces";
import { MessageDisplay } from '../../components/ui/MessagesDisplay'
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
      .catch((err) => {
        setMessage('')
        setError(err.response.data.error)
      })

      setTimeout(() => {
        getAllItems(company)
        .then(data => setItems(data))
      }, 500);

  }, []);


  return (
    <div>
      <h1>Asignar Item a Bodega</h1>
      <MessageDisplay message={message} error={error}/>
    </div>
  );
}