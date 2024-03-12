interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-green-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-blue-800"
      {...props}
    >
      {children}
    </button>
  )
}