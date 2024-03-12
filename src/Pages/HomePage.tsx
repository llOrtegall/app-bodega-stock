import { CambiarCompany } from "../components/DefineCompany";
import { useAuth } from "../Auth/AuthContext"

export const HomePage = () => {
  const { user } = useAuth()
  const empresa = user ? user.empresa : '';

  const welcomeMessage = "¡Bienvenido!";
  const welcomeDescription = "Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.";

  return (

    <section className="flex flex-col text-center text-black">
      <h1 className="text-4xl font-bold ">{welcomeMessage}</h1>
      <p className="mt-4 text-lg ">{welcomeDescription}</p>

      {
        empresa !== 'Multired' && empresa !== 'Servired' && empresa !== null && empresa !== undefined
          ? <CambiarCompany />
          : null
      }

      <div className="text-black absolute bottom-0 p-2">
        <p className="font-semibold">Database: 
          <span className="text-red-500"> {user?.empresa} </span>
        </p>
      </div>
    </section>
  )
}