import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

import Root from "@/routes/Root";

const Home = lazy(() => import("@/pages/Home"));


export const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense>
      }
    ]
  }
]);

