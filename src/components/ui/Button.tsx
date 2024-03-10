interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-blue-800 text-white px-4 py-2 font-semibold rounded-md"
      {...props}
    >
      {children}
    </button>
  )
}