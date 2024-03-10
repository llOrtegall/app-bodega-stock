interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export function Label({ children, ...props }: Props) {
  return (
    <label
      className="font-semibold text-black"
      {...props}
    >
      {children}
    </label>
  )
}