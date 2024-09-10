import { useAuth } from "../Auth/AuthContext";
import LoginPage from "../Pages/LoginPage";

const Root = () => {
  const { isAuthenticated, user } = useAuth()

  if (!isAuthenticated && user == null) {
    return <LoginPage />
  }

  return (
    <div>Hello World</div>
  )
}

export { Root }