import { Card, DonutChart, Title, List, ListItem } from '@tremor/react'
import { useState } from 'react'

import JSON from '../../mocks/harwareocs.json'

function HardwareOSC() {
  const hardware = JSON.map((item) => {
    return {
      name: item.OSNAME
    }
  })

  const hardware2 = hardware.reduce((acc, item) => {
    const found = acc.find(({ name }) => name === item.name)
    if (found) {
      found.count++
    } else {
      acc.push({ name: item.name, count: 1 })
    }
    return acc
  }, [])

  return hardware2
}

export const GraficoSistemas = (): JSX.Element => {
  const [value, setValue] = useState(null)

  const Sistemas = HardwareOSC()

  return (
    <Card className='flex flex-col justify-around'>
      <Title className='text-center underline'>
        Sistemas Operativos
      </Title>

      <DonutChart category="count" index="name" colors={['pink', 'cyan', 'amber', 'purple']}
        className="" data={Sistemas} onValueChange={(v) => { setValue(v) }} />

      <List className=''>
        {Sistemas.map((item, index) => (
          <ListItem key={index} className='min-w-96'>
            <p className="font-semibold pr-4"><span>{item.name}</span></p>
            <p className="font-semibold pr-4"><span>{item.count}</span></p>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
