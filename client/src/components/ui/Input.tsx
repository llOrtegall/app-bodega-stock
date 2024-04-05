interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input ({...props}: Props): JSX.Element {
  return (
    <input className="rounded-md border-none bg-gray-100 outline-none "
    {...props} />
  )
}
