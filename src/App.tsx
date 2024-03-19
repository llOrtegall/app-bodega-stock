import { ProtectedRoute } from './components/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext'
import { useEffect } from 'react'
import axios from 'axios'

import { CrearSimcard, VerSimcards, AsignarSimcards, CreaMovimientosSim } from './Pages/Simcards'
import { CrearMovimiento, DesatalleMovimiento, ShowMovimientos } from './Pages/Movimientos'
import { AsignarItemBodega, CrearItems, DetalleItem, VerItems } from './Pages/Items'
import { CrearBodega, DetalleBodega, ShowBodegas } from './Pages/Bodega'
import { LoginPage, NotFound, HomePage } from './Pages'

axios.defaults.baseURL = 'http://172.20.1.110:4000/api'
// axios.defaults.baseURL = 'http://172.20.1.70:4000/api'
export function App (): JSX.Element {
  const { user, login } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('tokenBodega')
    if (token !== null) {
      login(token)
    } else {
      console.log('No Token')
    }
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route element={<ProtectedRoute isAllowed={!(user == null)} redirectTo="/" />}>
          <Route index path="/home" element={<HomePage />} />
          <Route path="/items/verItems" element={<VerItems />} />
          <Route path="/movimientos" element={<ShowMovimientos />} />
          <Route path="/items/verItem/:id" element={<DetalleItem />} />
          <Route path="/bodega/verBodegas" element={<ShowBodegas />} />
          <Route path="/bodega/detalle/:id" element={<DetalleBodega />} />
          <Route path="/simcards/verSimcards" element={<VerSimcards />} />
          <Route path="/movimientos/detalle/:id" element={<DesatalleMovimiento />} />
        </Route>

        <Route element={<ProtectedRoute
          isAllowed={!(user == null) && (user.rol === 'Administrador' || user?.rol === 'Aux Administrativo') } redirectTo="/home" />}>
          <Route path="/items/crearItems" element={<CrearItems />} />
          <Route path="/items/asignarItems" element={<AsignarItemBodega />} />
        </Route>

        <Route element={<ProtectedRoute
          isAllowed={!(user == null) && (user.rol === 'Administrador' || user?.rol === 'Aux Administrativo') } redirectTo="/home" />}>
          <Route path="/bodega/crearBodega" element={<CrearBodega />} />
          <Route path="/bodega/crearMovimiento" element={<CrearMovimiento />} />
        </Route>

        <Route element={<ProtectedRoute
          isAllowed={!(user == null) && (user.rol === 'Administrador' || user?.rol === 'Coordinador Soporte') } redirectTo="/home" />}>
          <Route path="/simcards/crearSimcard" element={<CrearSimcard />} />
          <Route path="/simcards/asignarSimcards" element={<AsignarSimcards />} />
          <Route path="/simcards/crearMovimiento" element={<CreaMovimientosSim /> } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
