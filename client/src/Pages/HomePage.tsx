import { CambiarCompany } from '../components/DefineCompany'
import { Dashboard } from './Dashboard/Dashboard'
import { useAuth } from '../Auth/AuthContext'

export const HomePage = (): JSX.Element => {
  const { user } = useAuth()
  const empresa = user.empresa

  console.log(empresa);
  
  return (
    empresa !== 'Multired' && empresa !== 'Servired'
      ? <CambiarCompany />
      : <Dashboard />

  )
}
