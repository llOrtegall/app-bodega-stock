import { utils, writeFile } from 'xlsx'

export const BottonExportSimcards = ({ simcards }) => {
  const titulo = [{ A: 'Reporte De Simcards' }, {}]
  // const hora = new Date()
  // const infoCreacción = { A: `Fecha De Creación ${formatFecha(hora)}` }

  const longitudes = [25, 25, 20, 10, 10, 10, 10, 20, 20]

  const handleDownload = () => {
    const tabla = [
      {
        A: 'UUID',
        B: 'NÚMERO',
        C: 'OPERADOR',
        D: 'ESTADO',
        E: 'SERIAL',
        F: 'APN',
        G: 'USUARIO',
        H: 'CONTRASEÑA',
        I: 'UBICACIÓN|BODEGA'
      }
    ]

    simcards.forEach((sim) => {
      tabla.push({
        A: sim._id,
        B: sim.numero,
        C: sim.operador,
        D: sim.estado,
        E: sim.serial,
        F: sim.apn,
        G: sim.user,
        H: sim.pass,
        I: sim.bodega.nombre || sim.bodega
      })
    })

    const dataFinal = [...titulo, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (dataFinal) => {
    const libro = utils.book_new()
    const hoja = utils.json_to_sheet(dataFinal, { skipHeader: true })

    hoja['!merges'] = [
      utils.decode_range('A1:G1'),
      utils.decode_range('A2:G2'),
      utils.decode_range('A3:G3')
    ]

    let simpiedades = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    utils.book_append_sheet(libro, hoja, 'Items')
    writeFile(libro, 'datos.xlsx')
  }

  return (
  <button onClick={handleDownload} 
    className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded'>
    Exportar a Excel
  </button>)
}