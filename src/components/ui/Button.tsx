interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, ...props }: Props): JSX.Element {
  return (
    <button
      className='bg-blue-700 p-2 rounded-md text-white font-bold hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      {...props}
    >
      {children}
    </button>
  )
}
