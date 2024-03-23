interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button ({ children, ...props }: Props): JSX.Element {
  return (
    <button className='w-full shadow-lg bg-blue-600 p-2 rounded-md font-semibold text-white hover:bg-green-500 transition-all duration-300 ease-in-out' {...props} >
      {children}
    </button>
  )
}
