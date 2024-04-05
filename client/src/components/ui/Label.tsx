interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label ({ children, ...props }: Props): JSX.Element {
  return (
    <label className='font-semibold text-xs' {...props}>
      {children}
    </label>
  )
}
