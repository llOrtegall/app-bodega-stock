interface Props extends React.LabelHTMLAttributes<HTMLLabelElement> {
  textColor?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
}

export function Label ({ children, textColor, size, ...props }: Props): JSX.Element {
  return (
    <label className={`font-semibold ${textColor} text-${size}`} {...props}
    >
      {children}
    </label>
  )
}
