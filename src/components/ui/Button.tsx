interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, ...props }: Props): JSX.Element {
  return (
    <button
      className='bg-blue-700 p-2 rounded-md text-white font-bold hover:bg-blue-800'
      {...props}
    >
      {children}
    </button>
  )
}
