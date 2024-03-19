import { Link } from 'react-router-dom'

export function NotFound (): JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-teal-300 to-teal-500py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h1 className="mt-6 text-center text-3xl font-extrabold text-black">404 - Not Found</h1>
        <h3 className="mt-2 text-center text-xl text-black">Ir al inicio</h3>
        <div className="flex justify-center">
          <Link to="/home" className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Inicio</Link>
        </div>
      </div>
    </div>
  )
}
