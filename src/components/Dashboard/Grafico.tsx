import { Card, DonutChart, Title, List, ListItem } from '@tremor/react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useAuth } from '../../Auth/AuthContext'

async function HardwareOSC(response) {
  const hardware = await response.map((item) => {
    return {
      name: item.OSNAME
    }
  })

  const hardware2 = await hardware.reduce((acc, item) => {
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
  const { user } = useAuth()
  const company = user.empresa

  useEffect(() => {
    void axios.get(`/info/${company}`)
      .then(response => {
        void HardwareOSC(response.data)
          .then(data => setValue(data)
          )
      })
  }, [])

  return (
    value && (
      <Card className='flex flex-col justify-around'>
        <Title className='text-center underline'>
          Sistemas Operativos
        </Title>

        <DonutChart category="count" index="name" colors={['pink', 'cyan', 'amber', 'purple']}
          className="" data={value} onValueChange={(v) => { setValue(v) }} />

        <List className=''>
          {value.map((item, index) => (
            <ListItem key={index} className='min-w-96'>
              <p className="font-semibold pr-4"><span>{item.name}</span></p>
              <p className="font-semibold pr-4"><span>{item.count}</span></p>
            </ListItem>
          ))}
        </List>
      </Card>
    )

  )
}
