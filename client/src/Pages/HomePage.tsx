import { CambiarCompany } from '../components/DefineCompany'
import { Dashboard } from './Dashboard/Dashboard'
import { useAuth } from '../Auth/AuthContext'

export const HomePage = (): JSX.Element => {
  const { user } = useAuth()

  return (
    user?.company !== 'Multired' && user?.company !== 'Servired'
      ? <CambiarCompany />
      : <Dashboard />

  )
}
