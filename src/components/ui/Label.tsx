interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label ({ children, ...props }: Props): JSX.Element {
  return (
    <label className='' {...props}
    >
      {children}
    </label>
  )
}
