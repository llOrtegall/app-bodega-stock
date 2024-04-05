interface Props extends React.ImgHTMLAttributes<HTMLImageElement>{}

export function Image ({...props}: Props): JSX.Element {
  return (
    <img {...props}/>
  )
}
