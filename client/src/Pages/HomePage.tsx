import { CambiarCompany } from '../components/DefineCompany'
import { GraficoSistemas } from '../components/Dashboard/Grafico'
import CalloutComp from '../components/Dashboard/Card'
import { useAuth } from '../Auth/AuthContext'

export const HomePage = (): JSX.Element => {
  const { company } = useAuth()
  
  if (company !== 'Multired' && company !== 'Servired') {
    return <CambiarCompany />
  }

  return (
    <main className='grid grid-cols-2 gap-2 p-2'>
      <CalloutComp company={company}/>
      <GraficoSistemas company={company}/>
    </main>
  )
}
