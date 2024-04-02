import { type SimcardWithBodega } from '../../types/Simcard.interfaces'
import { type ColInfo, utils, writeFile } from 'xlsx'
import { Button } from '../ui'

export const BottonExportSimcards = ({ simcards }: { simcards: SimcardWithBodega[] }): JSX.Element => {
  const titulo = [{ A: 'Reporte De Simcards' }, {}]

  const longitudes = [25, 25, 20, 10, 10, 10, 10, 20, 20]

  const handleDownload = (): void => {
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
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        I: (typeof sim.bodega === 'string' ? sim.bodega : sim.bodega?.nombre) ?? ''
      })
    })

    const dataFinal = [...titulo, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (dataFinal: unknown[]): void => {
    const libro = utils.book_new()
    const hoja = utils.json_to_sheet(dataFinal, { skipHeader: true })

    hoja['!merges'] = [
      utils.decode_range('A1:G1'),
      utils.decode_range('A2:G2'),
      utils.decode_range('A3:G3')
    ]

    const simpiedades: ColInfo[] | Array<{ width: number }> | undefined = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    utils.book_append_sheet(libro, hoja, 'Items')
    writeFile(libro, 'datos.xlsx')
  }

  return (
    <Button onClick={handleDownload}>
      Exportar a Excel
    </Button>)
}
