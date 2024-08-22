import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../Auth/AuthContext'
import { type FC } from 'react'
import { NavBar } from './ui'

interface ProtectedRouteProps {
  redirectTo?: string
  isAllowed?: boolean
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ isAllowed, redirectTo = '/' }) => {
  const { user } = useAuth()

  if (!(isAllowed ?? false)) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      <section className='w-full'>
        <NavBar />
      </section>
      <section className='h-[90vh] overflow-auto'>
        <Outlet />
      </section>

      <div className="text-black absolute bottom-0 left-0 ">
        <p className="font-semibold dark:text-white">Database:
          <span className="text-red-500"> {user.company} </span>
        </p>
      </div>
    </>
  )
}
