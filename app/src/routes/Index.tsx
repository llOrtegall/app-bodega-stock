import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

import Root from "@/routes/Root";

const Home = lazy(() => import("@/pages/Home"));
const Items = lazy(() => import("@/pages/articulos/Items"));
const NewItem = lazy(() => import("@/pages/articulos/NewItem"));
const AsignarItems = lazy(() => import("@/pages/articulos/AsignarItems"));
const EditarItem = lazy(() => import("@/pages/articulos/EditarItem"));
const MovimientosPage = lazy(() => import("@/pages/movimientos/Movimientos"));
const MovDetalle = lazy(() => import("@/pages/movimientos/MovDetalle"));

const BodegasPage = lazy(() => import("@/pages/bodegas/Bodegas"));
const Bodega = lazy(() => import("@/pages/bodegas/BodegaDetail"));
const NewBodega = lazy(() => import("@/pages/bodegas/NewBodega"));

export const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
      },
      {
        path: 'showItems',
        element: <Suspense fallback={<div>Loading...</div>}>{<Items />}</Suspense>
      },
      {
        path: 'newItem',
        element: <Suspense fallback={<div>Loading...</div>}>{<NewItem />}</Suspense>
      },
      {
        path: 'asignarItems',
        element: <Suspense fallback={<div>Loading...</div>}>{<AsignarItems />}</Suspense>
      },
      {
        path: 'editarItem/:id',
        element: <Suspense fallback={<div>Loading...</div>}>{<EditarItem />}</Suspense>
      },
      {
        path: 'movimientos',
        element: <Suspense fallback={<div>Loading...</div>}>{<MovimientosPage />}</Suspense>
      },
      {
        path: 'movimiento/:id',
        element: <Suspense fallback={<div>Loading...</div>}><MovDetalle /></Suspense>
      },
      {
        path: 'bodegas',
        element: <Suspense fallback={<div>Loading...</div>}><BodegasPage /></Suspense>
      },
      {
        path: 'bodega/:id',
        element: <Suspense fallback={<div>Loading...</div>}><Bodega /></Suspense>
      },
      {
        path: 'newBodega',
        element: <Suspense fallback={<div>Loading...</div>}><NewBodega /></Suspense>
      }
    ]
  }
]);

