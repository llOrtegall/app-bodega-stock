import { CambiarCompany } from '../components/DefineCompany'
import { useAuth } from '../Auth/AuthContext'

import { RiAlarmWarningLine } from '@remixicon/react'
import { Callout, Card } from '@tremor/react'

function CalloutUsageExample (): JSX.Element {
  return (
    <div className="space-y-6">
      <Card className="mx-auto max-w-md">
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Current wind speed: Turbine 1</p>
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">18.4knts</p>
        <Callout
          className="mt-4"
          title="Critical speed limit reached"
          icon={RiAlarmWarningLine}
          color="yellow"
        >
          Turbine reached critical speed. Immediately reduce turbine speed.
        </Callout>
      </Card>
    </div>
  )
}

export const HomePage = (): JSX.Element => {
  const { user } = useAuth()
  const empresa = user.empresa

  const welcomeMessage = '¡Bienvenido!'
  const welcomeDescription = 'Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.'

  return (

    <section className="flex flex-col items-center justify-center text-center text-black min-h-[92vh]">

      <CalloutUsageExample />

      <h1 className="text-4xl font-bold ">{welcomeMessage}</h1>
      <p className="mt-4 text-lg ">{welcomeDescription}</p>

      {
        empresa !== 'Multired' && empresa !== 'Servired' && empresa !== null && empresa !== undefined
          ? <CambiarCompany />
          : null
      }
    </section>
  )
}
