interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> { }

export function Label ({ children, color, ...props }: Props): JSX.Element {
  return (
    <label
      className={`font-semibold ${color}` }
      {...props}
    >
      {children}
    </label>
  )
}
