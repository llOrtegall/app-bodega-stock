export const HomePage = () => {
  return (
    <main className="bg-blue-800 min-h-[93vh] flex items-center justify-center flex-col">
      {/* {
        company !== 'Multired' && company !== 'Servired' && company !== null && company !== undefined
          ? <CambiarCompany key={key} fun={defineCompany} />
          : null
      } */}
      <h1 className="text-4xl font-bold text-white">¡Bienvenido!</h1>
      <p className="mt-4 text-lg text-white">Estamos encantados de verte aquí. Explora y disfruta de todas las funcionalidades que tenemos para ti.</p>
    </main>
  )
}