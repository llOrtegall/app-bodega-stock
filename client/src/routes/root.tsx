import { useAuth } from "../Auth/AuthContext";
import LoginPage from "../Pages/LoginPage";

const Root = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return (
    <div>Hello World</div>
  )
}

export { Root }