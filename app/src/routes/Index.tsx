import { createBrowserRouter } from "react-router";

import Root from "@/routes/Root";
import Home from "@/pages/Home";

export const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

