import { Simcard } from "../../types/Bodega"

function BodSimsDetails({ simcards }: {simcards: Simcard[]}) {
  return (
    <>
      <article className="grid grid-cols-7 text-center bg-blue-200 dark:bg-blue-900 dark:text-white shadow-lg py-2 mb-2 text-sm">
        <p className="font-semibold">Número</p>
        <p className="font-semibold">Operador</p>
        <p className="font-semibold">Estado</p>
        <p className="font-semibold">Serial</p>
        <p className="font-semibold">APN</p>
        <p className="font-semibold">User</p>
        <p className="font-semibold">Pass</p>
      </article>

      <article className=''>
        {
          Array.isArray(simcards) && simcards.length !== 0
            ? (simcards.map(item => (
              typeof item !== 'string' && (
                <article key={item._id} className="grid grid-cols-7 rounded-md bg-slate-100 dark:bg-slate-600 dark:text-white uppercase text-sm py-2 my-2 text-center shadow-lg">
                  <p className="font-semibold">{item.numero}</p>
                  <p className="text-gray-500 dark:dark:text-white ">{item.operador}</p>
                  <p className="text-gray-500 dark:dark:text-white ">{item.estado}</p>
                  <p className="text-gray-700 dark:text-white overflow-ellipsis overflow-hidden">{item.serial}</p>
                  <p className="text-gray-500 dark:dark:text-white  overflow-ellipsis overflow-hidden">{item.apn}</p>
                  <p className="text-gray-500 dark:dark:text-white ">{item.user}</p>
                  <p className="text-gray-500 dark:dark:text-white ">{item.pass}</p>
                </article>
              )
            )))
            : (<p className='text-center text-2xl font-semibold'>No Existen Simcards Asignadas</p>)
        }
      </article>
    </>
  )
}

export default BodSimsDetails