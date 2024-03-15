export function FooterMovSim ({ encargado, incidente, setIncidente, descripcion, setDescripcion, handleClick }) {
  return (
    <>
      <footer className="py-4 bg-slate-600 rounded-md text-white mx-2 mt-2">
        <form className="grid grid-cols-2 gap-3">
          <label className="flex h-10 items-center ml-3"> <span className="font-semibold w-32">Encargado:</span>
            <input type="text" className="w-full p-2 rounded-md col-span-1 bg-green-200 no-underline text-black"
              value={encargado} placeholder="Pepito Perez Muñoz" readOnly/>
          </label>
          <label className="flex h-10 items-center"> <span className="font-semibold w-32">N° Incidente:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
              value={incidente} onChange={ev => setIncidente(ev.target.value)}
              placeholder="134564 | 234252 | 634532" />
          </label>
          <label className="col-span-3 mx-3"> <span className="font-semibold w-40">Observaciones:</span>
            <input type="text" className="w-full p-2 rounded-md bg-slate-100 no-underline text-black"
              value={descripcion} onChange={ev => setDescripcion(ev.target.value)}
              placeholder="texto para registrar observación ..." />
          </label>
        </form>
      </footer>
      <section className="flex w-full justify-center mt-4">
        <button className="p-2 text-white font-bold w-48 bg-green-600 rounded-md hover:bg-white  hover:text-black" onClick={handleClick}>
          Realizar Movimiento
        </button>
      </section>
    </>
  )
}
