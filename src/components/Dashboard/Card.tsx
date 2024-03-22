import { getDetailBodegaById } from '../../services/Bodegas.services'
import { type BodegaIntIS } from '../../types/Bodega'
import { RiAlarmWarningLine } from '@remixicon/react'
import { useAuth } from '../../Auth/AuthContext'
import { Callout, Card } from '@tremor/react'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CountItems ({ items }: { items: BodegaIntIS | undefined }) {
  const counts: Record<string, number> = {}
  const lessThanTwo: string[] = []

  // agregar array de items para evaluar si hay menos de 2

  items?.items.forEach(item => {
    if (item.nombre in counts) {
      counts[item.nombre]++
    } else {
      counts[item.nombre] = 1
    }
  })

  for (const count in counts) {
    if (counts[count] < 1) {
      lessThanTwo.push(count)
    }
  }

  return lessThanTwo
}

function CalloutComp (): JSX.Element {
  const [lessThanTwo, setLessThanTwo] = useState<string[]>([])

  const { user } = useAuth()
  const company = user.empresa

  useEffect(() => {
    void getDetailBodegaById({ company, id: '65aa83481383faff659d4d58' })
      .then(response => {
        setLessThanTwo(CountItems({ items: response }))
      })
  }, [])

  return (
    <div className="space-y-6">
      <Card className="mx-auto max-w-md">
        <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Bodega Stock Soporte</p>
        {
          lessThanTwo.length === 0
            ? <Callout className="mt-4" title="Atención " icon={RiAlarmWarningLine} color="red">
              <p>La Bodega Está Vacía</p>
            </Callout>
            : <Callout className="mt-4" title="Atención estos items están por agotarse" icon={RiAlarmWarningLine} color="yellow">
              {lessThanTwo.map((item, index) => (
                <p key={index} className="font-semibold">{item}</p>))
              }
            </Callout>
        }

      </Card>
    </div>
  )
}

export default CalloutComp
