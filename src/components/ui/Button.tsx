interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export function Button({ children, ...props }: Props) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      {...props}
    >
      {children}
    </button>
  )
}