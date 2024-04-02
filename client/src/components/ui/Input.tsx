interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  displaySize?: 'w-full' | 'block'
}

export function Input ({displaySize, ...props}: Props): JSX.Element {
  return (
    <input
      className={`${displaySize} rounded-md border text-black border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
      {...props}
    />
  )
}
