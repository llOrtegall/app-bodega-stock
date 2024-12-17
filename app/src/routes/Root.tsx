import { useAuth } from "@/contexts/auth/AuthProvider";
import { Outlet, Navigate } from "react-router";

export default function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>React App</h1>
      <Outlet />
    </div>
  );
}