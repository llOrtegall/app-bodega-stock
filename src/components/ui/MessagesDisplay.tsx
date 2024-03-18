import { SuccesIcon, WarningIcon } from '../icons'

export function MessageDisplay ({ message, error }:{ message: string, error: string }) {
  return (
    <section className='h-10'> 
      <article className="">
        {message &&
          <div className='flex gap-2'>
            <figure className='bg-green-600 text-white font-bold flex items-center justify-center text-center px-2 rounded-md'>
              <SuccesIcon />
            </figure>
            <p className="text-center bg-green-600 text-white font-semibold p-2 rounded-md">
              {message}
            </p>
          </div>
        }
        {error &&
          <div className='flex gap-2'>
            <figure className='bg-red-500 text-white flex items-center justify-center text-center px-2 rounded-md'>
              <WarningIcon />
            </figure>
            <p className="text-center bg-red-500 text-white font-semibold p-2 rounded-md">
              {error}
            </p>
          </div>
        }
      </article>
    </section>
  )
}
