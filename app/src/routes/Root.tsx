import { useAuth } from "@/contexts/auth/AuthProvider";

import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import("@/pages/Login"));
const MainLayout = lazy(() => import("@/Layouts/MainLayout"));

export default function Root() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Suspense fallback={<div>Loading...</div>}><LoginPage /></Suspense>;
  }

  return <Suspense fallback={<div>Loading...</div>}><MainLayout /></Suspense>;
}