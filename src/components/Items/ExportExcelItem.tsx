import { type ItemsArray } from '../../types/Item'
import { type ColInfo, utils, writeFile } from 'xlsx'
import { Button } from '../ui'

interface RenderItemsProps {
  items: ItemsArray
}

export const BottonExportItems = (datos: RenderItemsProps): JSX.Element => {
  const titulo = [{ A: 'Reporte de Items' }]

  const longitudes = [22, 22, 20, 10, 10, 25, 10]

  const handleDownload = (): void => {
    const tabla = [
      {
        A: 'NOMBRE',
        B: 'DESCRIPCIÓN',
        C: 'SERIAL',
        D: 'PLACA',
        E: 'ESTADO',
        F: 'UBICACIÓN|BODEGA',
        G: 'SUCURSAL'
      }
    ]

    datos.items.forEach((it) => {
      if (typeof it.bodega === 'object') {
        tabla.push({
          A: it.nombre,
          B: it.descripcion,
          C: it.serial,
          D: it.placa,
          E: it.estado,
          F: it.bodega.nombre,
          G: it.bodega.sucursal.toString()
        })
      } else {
        tabla.push({
          A: it.nombre,
          B: it.descripcion,
          C: it.serial,
          D: it.placa,
          E: it.estado,
          F: 'No Asignado',
          G: 'No Asignado'
        })
      }
    })

    const dataFinal = [...titulo, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 3000)
  }

  const creandoArchivo = (data: unknown[]): void => {
    const libro = utils.book_new()
    const hoja = utils.json_to_sheet(data, { skipHeader: true })

    hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

    const simpiedades: ColInfo[] | Array<{ width: number }> | undefined = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    utils.book_append_sheet(libro, hoja, 'Items')
    writeFile(libro, 'ReporteItems.xlsx')
  }

  return (
  <Button onClick={handleDownload}>
    Exportar a Excel
  </Button>)
}
