import { ButtonDow } from "../icons"

interface Props {
  id: string
  handleClick: (id: string) => void
}

function ButtonActiComp ({ id, handleClick }: Props): JSX.Element {
  return (
    <button id={id} className="flex bg-slate-200 dark:bg-slate-950 text-sm xl:text-base 1xl:text-lg 2xl:text-xl 3xl:text-2xl font-semibold items-center hover:text-blue-600"
      onClick={() => { handleClick(id) }} >
      <span>{id}</span>
      <figure className="flex items-center pt-1"><ButtonDow /></figure>
    </button>
  )

}

export default ButtonActiComp