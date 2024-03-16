const ClaroIcon = () => {
  return(
    <img width={30} src="../public/claroIcon.png" alt="icono clar" />
  )
}

const MovistarIcon = () => {
  return(
    <img width={30} src="../public/logoMovistar.png" alt="icono movistar" />
  )
}

const TigoIcon = () => {
  return(
    <img width={30} src="../public/logoTigo.png" alt="icono tigo" />
  )
}

const IconMap = {
  Claro: ClaroIcon,
  Movistar: MovistarIcon,
  Tigo: TigoIcon
}

export function RenderIconSims ({operador}: {operador: string}) {
  const IconComponent = IconMap[operador as keyof typeof IconMap]

  return IconComponent
    ? (
        <figure>
          <IconComponent />
        </figure>
      )
    : null
}
