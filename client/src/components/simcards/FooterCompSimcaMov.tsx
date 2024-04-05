import { Button, Input, Label } from "../ui"

interface FooterMovSimProps {
  encargado: string
  incidente: string
  setIncidente: React.Dispatch<React.SetStateAction<string>>
  descripcion: string
  setDescripcion: React.Dispatch<React.SetStateAction<string>>
  handleClick: () => void
}

export function FooterMovSim({ encargado, incidente, setIncidente, descripcion, setDescripcion, handleClick }: FooterMovSimProps): JSX.Element {
  return (
    <footer className="bg-blue-200  py-2 grid grid-cols-12 place-content-center place-items-center mt-1 px-2">
      <div className="col-span-3 text-center flex flex-col w-full">
        <Label>Encargado:</Label>
        <Input type="text" value={encargado} readOnly />
      </div>
      <div className="col-span-2 text-center flex flex-col">
        <Label>N° Incidente:</Label>
        <Input type="text" value={incidente} onChange={ev => { setIncidente(ev.target.value) }} placeholder="134564 | 234252 | 634532" />
      </div>
      <div className="col-span-4 text-center flex flex-col w-full">
        <Label>Observaciones:</Label>
        <Input type="text" value={descripcion} onChange={ev => { setDescripcion(ev.target.value) }} placeholder="texto para registrar observación ..." />
      </div>
      <div className="col-span-2 text-center flex flex-col">
        <Button onClick={handleClick}>Realizar Movimiento</Button>
      </div>
    </footer>
  )
}


