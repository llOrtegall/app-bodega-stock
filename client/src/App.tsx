import { ProtectedRoute } from './components/ProtectedRoute'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from './Auth/AuthContext'
import axios from 'axios'

import { CrearSimcard, VerSimcards, AsignarSimcards, CreaMovimientosSim } from './Pages/Simcards'
import { CrearMovimiento, DesatalleMovimiento, ShowMovimientos } from './Pages/Movimientos'
import { AsignItemsToBodega, CrearItems, DetalleItem, VerItems } from './Pages/Items'
import { CrearBodega, DetalleBodega, ShowBodegas } from './Pages/Bodega'
import { NotFound, HomePage } from './Pages'

axios.defaults.withCredentials = true

import LoginPage from './Pages/LoginPage'

export function App(): JSX.Element {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated && user == null) {
    return <LoginPage />
  }

  const isAdminOrAux = !(user == null) && (user.process === 'Administración')
  const isAdminOrCoord = !(user == null) && (user.process === 'Administración')

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={!(user == null)} redirectTo="/" />}>
          <Route index path='/' element={<HomePage />} />
          <Route path="/items/verItems" element={<VerItems />} />
          <Route path="/movimientos" element={<ShowMovimientos />} />
          <Route path="/items/verItem/:id" element={<DetalleItem />} />
          <Route path="/bodega/verBodegas" element={<ShowBodegas />} />
          <Route path="/bodega/detalle/:id" element={<DetalleBodega />} />
          <Route path="/simcards/verSimcards" element={<VerSimcards />} />
          <Route path="/movimientos/detalle/:id" element={<DesatalleMovimiento />} />
        </Route>

         <Route element={<ProtectedRoute isAllowed={isAdminOrAux} redirectTo='/' />}>
          <Route path="/items/crearItems" element={<CrearItems />} />
          <Route path="/items/asignarItems" element={<AsignItemsToBodega />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isAdminOrAux} redirectTo='/' />}>
          <Route path="/bodega/crearBodega" element={<CrearBodega />} />
          <Route path="/bodega/crearMovimiento" element={<CrearMovimiento />} />
        </Route>

        <Route element={<ProtectedRoute isAllowed={isAdminOrCoord} redirectTo='/' />}>
          <Route path="/simcards/crearSimcard" element={<CrearSimcard />} />
          <Route path="/simcards/asignarSimcards" element={<AsignarSimcards />} />
          <Route path="/simcards/crearMovimiento" element={<CreaMovimientosSim /> } />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
