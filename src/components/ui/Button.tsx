interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

export function Button ({ children, textSize, ...props }: Props): JSX.Element {
  return (
    <button
      className={`bg-blue-500 text-white px-4 py-2 font-semibold rounded-md hover:bg-green-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 text-${textSize}`}
      {...props}
    >
      {children}
    </button>
  )
}
