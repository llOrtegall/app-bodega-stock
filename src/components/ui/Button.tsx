interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button ({ children, ...props }: Props): JSX.Element {
  return (
    <button
      className='bg-blue-600 p-2 rounded-md font-semibold text-white hover:bg-blue-900 transition-all duration-300 ease-in-out'
      {...props}
    >
      {children}
    </button>
  )
}
