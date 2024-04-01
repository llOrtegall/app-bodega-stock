import { getDetailBodegaById } from '../../services/Bodegas.services'
import { type BodegaIntIS } from '../../types/Bodega'
import { RiAlarmWarningLine } from '@remixicon/react'
import { Callout, Card, Title } from '@tremor/react'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CountItems({ items }: { items: BodegaIntIS | undefined, ArrayItemsNames: string[] }) {
  const counts: Record<string, number> = {}
  const notFound: string[] = []
  const lessThanTwo: string[] = []

  const ArrayItemsNames = ['Impresora TMU USB/LPT', 'Impresora Termica', 'Monitor / Pantalla', 'Torre', 'Teclado',
    'Mouse / Raton', 'Lector De Barras', 'Lector De Biometríco', 'Modem', 'UPS', 'Switch', 'Inversor']

  // Inicializar counts con todos los nombres de ArrayItemsNames con un conteo de 0
  ArrayItemsNames.forEach(name => {
    counts[name] = 0
  })

  // Incrementar el conteo para cada nombre en items
  items?.items.forEach(item => {
    if (item.nombre in counts) {
      counts[item.nombre]++
    }
  })

  for (const count in counts) {
    if (counts[count] === 0) {
      notFound.push(count)
    } else if (counts[count] < 2) {
      lessThanTwo.push(count)
    }
  }

  return { notFound, lessThanTwo }
}

function CalloutComp(): JSX.Element {
  const [lessThanTwo, setLessThanTwo] = useState<string[]>([])
  const [notFound, setNotFound] = useState<string[]>([])

  const { user } = useAuth()
  const company = user.empresa

  const definaBodega = company === 'Multired' ? () => '65aa83481383faff659d4d58' : () => '65c3d544f06f36524a98e72d'

  useEffect(() => {
    void getDetailBodegaById({ company, id: definaBodega() })
      .then(response => {
        const { notFound, lessThanTwo } = CountItems({ items: response, ArrayItemsNames: [] })
        setLessThanTwo(lessThanTwo)
        setNotFound(notFound)
      })
  }, [])

  return (
    <Card className="max-w-max">
      <Title className='text-center underline'>
        Bodega Stock Soporte 1001
      </Title>

      {
        notFound.length > 0 && (
          <Callout icon={RiAlarmWarningLine} color="red" title="Atención estos items no se encuentran en la bodega">
            {notFound.map(item => item)}
          </Callout>
        )
      }

      {
        lessThanTwo.length > 0 && (
          <Callout className="mt-4" icon={RiAlarmWarningLine} color="yellow" title="Atención Solo Existe 1 unidad por elemento:">
            {lessThanTwo.map(item => item)}
          </Callout>
        )
      }

    </Card>
  )
}

export default CalloutComp
