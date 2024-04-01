import CalloutComp from '../../components/Dashboard/Card'
import { GraficoSistemas } from '../../components/Dashboard/Grafico'

export function Dashboard (): JSX.Element {
  return (
    <main className='p-2 flex gap-2'>
      <CalloutComp />
      {/* <GraficoSistemas /> */}
    </main>
  )
}
