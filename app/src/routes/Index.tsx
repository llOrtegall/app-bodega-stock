import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

import Root from "@/routes/Root";

const Home = lazy(() => import("@/pages/Home"));
const Items = lazy(() => import("@/pages/articulos/Items"));
const NewItem = lazy(() => import("@/pages/articulos/NewItem"));
const AsignarItems = lazy(() => import("@/pages/articulos/AsignarItems"));

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
      }
    ]
  }
]);

