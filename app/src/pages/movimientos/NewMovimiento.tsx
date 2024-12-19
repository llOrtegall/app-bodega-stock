import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function NewMovimiento() {
  return (
    <div>
      <div className='flex items-center justify-around'>
        <h1 className="text-2xl text-center font-semibold py-2">Nuevo Movimiento Entre Bodegas - [ Sucursales ]
        </h1>
      </div>
      <Separator />

      <section className="flex w-full gap-1 px-1 pt-1">
        <Card className="w-1/2 p-2 h-[70vh]">
          bodega 1
        </Card>

        <Card className="w-1/2 p-2 h-[70vh]">
          bodega 2
        </Card>
      </section>
    </div>
  )
}