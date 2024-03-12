import { ColInfo, utils, writeFile} from 'xlsx'
import { ItemWithBodega  } from '../../interfaces/Item.Intece'

interface RenderItemsProps {
  items: ItemWithBodega;
}

export const BottonExportItems = (datos: RenderItemsProps ) => {
  const titulo = [{ A: 'Reporte de Items' }]
 
  const longitudes = [25, 25, 20, 10, 20, 20,]

  const handleDownload = () => {
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

    datos.items.forEach((item) => {
      tabla.push({
      A: item.nombre,
      B: item.descripcion,
      C: item.serial,
      D: item.placa,
      E: item.estado,
      F: (typeof item.bodega !== 'string' ? item.bodega?.nombre : 'No Asignado') || '',
      G: (typeof item.bodega !== 'string' ? item.bodega?.sucursal.toString() : 'No Asignado') || ''
      })
    })

    const dataFinal = [...titulo, ...tabla]

    setTimeout(() => {
      creandoArchivo(dataFinal)
    }, 1000)
  }

  const creandoArchivo = (data: unknown[]) => {
    const libro = utils.book_new()
    const hoja = utils.json_to_sheet(data, { skipHeader: true })

    hoja['!merges'] = [
      utils.decode_range('A1:G1'),
      utils.decode_range('A2:G2'),
      utils.decode_range('A3:G3')
    ]

    const simpiedades: ColInfo[] | { width: number }[] | undefined = []

    longitudes.forEach((col) => {
      simpiedades.push({ width: col })
    })

    hoja['!cols'] = simpiedades
    utils.book_append_sheet(libro, hoja, 'Items')
    writeFile(libro, 'datos.xlsx')
  }

  return (<button onClick={handleDownload} className='bg-green-800 hover:bg-green-600 text-white font-bold py-1 px-4 rounded'>Exportar a Excel</button>)
}