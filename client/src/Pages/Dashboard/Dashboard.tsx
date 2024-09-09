import CalloutComp from '../../components/Dashboard/Card'
import { GraficoSistemas } from '../../components/Dashboard/Grafico'

export function Dashboard (): JSX.Element {
  return (
    <main className='grid grid-cols-2 gap-2 p-2'>
      <CalloutComp />
      {/* <GraficoSistemas /> */}
    </main>
  )
}
