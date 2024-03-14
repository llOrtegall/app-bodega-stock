import { ProtectedRoute } from "./components/ProtectedRoute";
import { Routes, Route } from "react-router-dom";
import { LoginPage, NotFound } from './Pages'

import { useAuth } from './Auth/AuthContext';
import { useEffect } from 'react';
import axios from "axios";

import { HomePage } from "./Pages/HomePage";

import  { VerItems } from './Pages/Items/showItems'
import { CrearItems } from "./Pages/Items/crearItem";
import { AsignarItemBodega } from "./Pages/Items/asignItemBodega";
import { DetalleItem } from "./Pages/Items/DetailItemUpdate";
import { ShowBodegas } from "./Pages/Bodega/ShowBodegas";
import { DetalleBodega } from "./Pages/Bodega/DetalleBodega";

axios.defaults.baseURL = 'http://172.20.1.110:3030/api';
// axios.defaults.baseURL = '/api';

export function App() {
  const { user, login } = useAuth();


  useEffect(() => {
    const token = localStorage.getItem('tokenBodega');
    if (token) {
      login(token);
    } else {
      console.log('No Token');
    }
  }, [])
 
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={!!user} redirectTo="/" children={undefined} />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/items/verItems" element={<VerItems />} />
          <Route path="/items/verItem/:id" element={<DetalleItem />} />
          <Route path="/bodega/verBodegas" element={<ShowBodegas />} />
          <Route path="/bodega/detalle/:id" element={<DetalleBodega />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 'Administrador' || user?.rol ==='Aux Administrativo' } redirectTo="/home" children={undefined} />}>
          <Route path="/items/crearItems" element={<CrearItems />} />
          <Route path="/items/asignarItems" element={<AsignarItemBodega />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
