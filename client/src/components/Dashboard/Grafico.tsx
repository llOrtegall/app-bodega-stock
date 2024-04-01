import { Card, DonutChart, Title, List, ListItem } from '@tremor/react'
import { getHardware } from '../../services/Hardware.services'
import { type ArrayHardware } from '../../types/hardware'
import { useAuth } from '../../Auth/AuthContext'
import { useEffect, useState } from 'react'

export const GraficoSistemas = (): JSX.Element => {
  const [data, setData] = useState<ArrayHardware>([])
  const { user } = useAuth()
  const company = user.empresa

  useEffect(() => {
    void getHardware(company)
      .then((response) => {
        setData(response)
      })
      .catch((error) => { console.log(error) })
  }, [])

  interface ArrayStrings {
    name: string
    count: number
  }

  function HardwareOSC (response: ArrayHardware): ArrayStrings[] {
    const hardware = response.map((item) => {
      return {
        name: item.OSNAME
      }
    })

    const hardware2 = hardware.reduce((acc: ArrayStrings[], item) => {
      const found = acc.find(({ name }) => name === item.name)
      if (found != null) {
        found.count++
      } else {
        acc.push({ name: item.name, count: 1 })
      }
      return acc
    }, [])

    return hardware2
  }

  const value = HardwareOSC(data)

  return (
    <Card className='flex flex-col justify-around'>
      <Title className='text-center underline'>
        Sistemas Operativos
      </Title>

      <DonutChart category="count" index="name" colors={['pink', 'cyan', 'amber', 'purple']}
        className="" data={value} onValueChange={(v) => v} />

      <List className=''>
        {value.map((item, index) => (
          <ListItem key={index}>
            <span>{item.name}</span>
            <span>{item.count}</span>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}
