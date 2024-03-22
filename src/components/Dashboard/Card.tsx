import { getDetailBodegaById } from '../../services/Bodegas.services'
import { type BodegaIntIS } from '../../types/Bodega'
import { RiAlarmWarningLine } from '@remixicon/react'
import { useAuth } from '../../Auth/AuthContext'
import { Callout, Card } from '@tremor/react'
import { useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function CountItems ({ items }: { items: BodegaIntIS | undefined, ArrayItemsNames: string[] }) {
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

  // Agregar a notFound todos los nombres que tienen un conteo de 0
  // y a lessThanTwo todos los nombres que tienen un conteo de menos de 2
  for (const count in counts) {
    if (counts[count] === 0) {
      notFound.push(count)
    } else if (counts[count] < 2) {
      lessThanTwo.push(count)
    }
  }

  return { notFound, lessThanTwo }
}

function CalloutComp (): JSX.Element {
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
    <section className="">
      <Card className="mx-auto max-w-[450px]">
        <p className="text-2xl text-center underline text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Bodega Stock Soporte</p>

        <>
          {
            notFound.length > 0
              ? (
              <Callout className="mt-4" title="Atención estos items no se encuentran en la bodega" icon={RiAlarmWarningLine} color="red">
                <div className='w-full border border-slate-400 mb-2'></div>
                {notFound.map((item, index) => (
                  <p key={index} className="font-semibold text-base">{item}</p>))
                }
              </Callout>
                )
              : null
          }
        </>

        {
          lessThanTwo.length > 0
            ? <Callout className="mt-4" title="Atención estos items se encuentran en la bodega pero solo hay uno" icon={RiAlarmWarningLine} color="yellow">
              <div className='w-full border border-slate-400 mb-2'></div>
              {lessThanTwo.map((item, index) => (
                <p key={index} className="font-semibold text-base">{item}</p>))
              }
            </Callout>
            : null
        }

      </Card>
    </section>
  )
}

export default CalloutComp
