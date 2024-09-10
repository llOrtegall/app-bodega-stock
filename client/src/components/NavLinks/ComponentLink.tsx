import { LockIcon, SuccesIcon } from "../icons";
import { NavLink } from "react-router-dom";

interface PropNavLinks {
  link: string;
  title: string;
  rol: string | undefined;
  fun: (value: string | null) => void;
  validateRol: boolean;
}

function NavLinkItem({ link, title, rol, fun, validateRol }: PropNavLinks): JSX.Element {

  return (
    <NavLink to={link} onClick={() => fun(null)}
      className="hover:text-blue-600 font-semibold flex items-center justify-between px-4 py-1.5 3xl:py-3 w-full">
      <span>{title}</span>
      {
        validateRol
          ? (
            rol === 'Coordinador Soporte' || rol === 'Administración' || rol === 'Aux administrativo'
              ? <figure className='text-green-500 rounded-full'><SuccesIcon size='w-5 xl:w-6 2xl:w-7 3xl:w-8'/></figure>
              : <figure className='text-red-500 rounded-full'><LockIcon size='w-5 xl:w-6 2xl:w-7 3xl:w-8'/></figure>
          )
          : <figure className='text-green-500 rounded-full'><SuccesIcon size='w-5 xl:w-6 2xl:w-7 3xl:w-8'/></figure>
      }

    </NavLink>
  )
}

export default NavLinkItem