interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  textSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
}

export function Label ({ children, color, textSize, ...props }: Props): JSX.Element {
  return (
    <label
      className={`font-semibold ${color} text-${textSize}` }
      {...props}
    >
      {children}
    </label>
  )
}
