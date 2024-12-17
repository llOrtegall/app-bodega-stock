import { createBrowserRouter } from "react-router";

import { AuthProvider } from "@/contexts/auth/AuthProvider";

import LoginPage from "@/pages/Login";
import Root from "@/routes/Root";
import Home from "@/pages/Home";

export const RoutesApp = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Root />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />
  }
]);

