import { useAuth } from "@/contexts/auth/AuthProvider"
import { RenderIcon } from "@/components/RenderIcons"
import { Separator } from "@/components/ui/separator"
import { VITE_API_URL } from "@/config/enviroments"
import { Card } from "@/components/ui/card"
import { useEffect, useState } from "react"
import axios from "axios"
import { Badge } from "@/components/ui/badge"

interface Items {
  [key: string]: number
}

export default function Home() {
  const { company } = useAuth()
  const [items, setItems] = useState<Items>({})

  useEffect(() => {
    axios.get(`${VITE_API_URL}/info2/${company}`)
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
  }, [company])

  const sortedItems = Object.entries(items).sort(([, a], [, b]) => b - a)

  return (
    <div className="flex flex-col w-full h-full">
      <h1 className="text-xl text-center font-bold py-2">Items Registrados: {company}</h1>
      <Separator />
      <Card className="grid grid-cols-3 gap-2 p-2">
        {
          sortedItems.map(([key, value], index) => (
            <Card key={index} className="p-2 flex flex-col items-center">
              <div className="">
                <RenderIcon nameStr={key} />
              </div>
              <span className="">{key}</span>
              <Badge className="">{value}</Badge>
            </Card>
          ))
        }
      </Card>
    </div>
  )
}