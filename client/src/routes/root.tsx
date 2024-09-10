import { Outlet } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';

import LoginPage from '../Pages/LoginPage';
import { NavBar } from '../components/NavBar';

const Root = () => {
  const { isAuthenticated, user, company } = useAuth()

  if (!isAuthenticated && user == null) {
    return <LoginPage />
  }

  return (
    <>
      <section className='w-full'>
        <NavBar />
      </section>
      <section className='h-[90vh] overflow-auto'>
        <Outlet />
      </section>

      <div className='text-black absolute bottom-0 left-0 '>
        <p className='font-semibold dark:text-white'>Database:
          <span className='text-red-500'> {company} </span>
        </p>
      </div>
    </>
  )
}

export { Root }