import { CambiarCompany } from '../components/DefineCompany'
import { Dashboard } from './Dashboard/Dashboard'
import { useAuth } from '../Auth/AuthContext'

export const HomePage = (): JSX.Element => {
  const { user } = useAuth()
  const empresa = user.empresa

  return (
    empresa !== 'Multired' && empresa !== 'Servired' && empresa !== null && empresa !== undefined
      ? <CambiarCompany />
      : <Dashboard />

  )
}
