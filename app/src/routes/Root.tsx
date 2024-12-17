import { useAuth } from "@/contexts/auth/AuthProvider";
import MainLayout from "@/Layouts/MainLayout";
import LoginPage from "@/pages/Login";


export default function Root() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <MainLayout />;
}