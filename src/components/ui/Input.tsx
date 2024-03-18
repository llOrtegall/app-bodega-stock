interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input (props: Props): JSX.Element {
  return (
    <input
      className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      {...props}
    />
  )
}
