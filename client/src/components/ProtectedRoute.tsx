import { type ProtectedRouteProps } from '../types/Interfaces'
import { Navigate, Outlet } from 'react-router-dom'
import { NavBar } from './ui'
import React from 'react'
import { useAuth } from '../Auth/AuthContext'

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAllowed, redirectTo = '/' }) => {
  const { user } = useAuth()
  const empresa = user.empresa

  if (!(isAllowed ?? false)) {
    return <Navigate to={redirectTo} />
  }

  return (
    <>
      <section className='w-full'>
        <NavBar />
      </section>
      <section className='h-[92vh] overflow-auto'>
        <Outlet />
      </section>

      <div className="text-black absolute bottom-0 p-2">
        <p className="font-semibold">Database:
          <span className="text-red-500"> {empresa} </span>
        </p>
      </div>
    </>
  )
}
