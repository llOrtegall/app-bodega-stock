interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export function Label({ children, ...props }: Props) {
  return (
    <label
      className=""
      {...props}
    >
      {children}
    </label>
  )
}