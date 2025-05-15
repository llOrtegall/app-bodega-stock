import { Simcard } from '@/pages/simcards/Simcards'
import { utils, ColInfo, writeFile } from 'xlsx'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const generateExcelData = (datos: Simcard[]): unknown[] => {
  const titulo = [{ A: 'Consolidado Simcards' }]
  const headers = [
    {
      A: 'id',
      B: 'Numero',
      C: 'Operador',
      D: 'Estado',
      E: 'Serial',
      F: 'APN',
      G: 'User',
      H: 'Pass',
      I: 'Fecha Creación',
      J: 'Fecha Actualización',
      K: 'Nombre Bodega',
      L: 'Sucursal Bodega',
    }
  ]

  const rows = datos.map((it) => ({
    A: it._id,
    B: it.numero,
    C: it.operador,
    D: it.estado,
    E: it.serial,
    F: it.apn,
    G: it.user,
    H: it.pass,
    I: it.createdAt,
    J: it.updatedAt,
    K: it.bodega.nombre,
    L: it.bodega.sucursal,
  }))

  return [...titulo, ...headers, ...rows]
}

const createExcelFile = (data: unknown[]): void => {
  const libro = utils.book_new()
  const hoja = utils.json_to_sheet(data, { skipHeader: true })

  hoja['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }]

  const colWidths: ColInfo[] = [
    { width: 10 }, { width: 10 }, { width: 30 }, { width: 10 }, { width: 20 },
    { width: 10 }, { width: 10 }, { width: 20 }, { width: 10 }, { width: 10 },
    { width: 10 }, { width: 10 }, { width: 10 }
  ]

  hoja['!cols'] = colWidths
  utils.book_append_sheet(libro, hoja, 'Consolidado')
  writeFile(libro, 'Simcards.xlsx')
}

export const ButtonExportSimcards = ({ datos }: { datos: Simcard[] }): JSX.Element => {
  const handleDownload = (): void => {
    const dataFinal = generateExcelData(datos)

    const promises = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ name: 'sonner' })
      }, 3000)
    })

    toast.promise(promises, {
      loading: 'Generando Archivo ...',
      description: 'Espere un momento',
      style: { background: '#fcd34d' },
      success: () => {
        createExcelFile(dataFinal)
        return 'Archivo Generado Correctamente'
      },
      error: 'Error al Generar Archivo'
    })
  }

  return (
    <Button onClick={handleDownload}>
      Exportar a Excel
    </Button>
  )
}