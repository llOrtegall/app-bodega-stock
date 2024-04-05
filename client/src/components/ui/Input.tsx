interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input ({...props}: Props): JSX.Element {
  return (
    <input className="h-8 rounded-md text-xs text-start px-2"
    {...props} />
  )
}
