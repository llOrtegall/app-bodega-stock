import { utils, ColInfo, writeFile } from 'xlsx'
import { Button } from '@/components/ui/button'
import { Bodega } from '@/types/Bodegas'
import { toast } from 'sonner'

const generateExcelData = (datos: Bodega[]): unknown[] => {
  const titulo = [{ A: 'Consolidado Bodegas' }]
  const headers = [
    {
      A: 'id',
      B: 'Nombre',
      C: 'Dirección',
      D: 'Sucursal',
      E: 'N° Items',
      F: 'N° Simcards',
    }
  ]

  const rows = datos.map((it) => ({
    A: it._id,
    B: it.nombre,
    C: it.direccion,
    D: it.sucursal,
    E: it.items.length,
    F: it.simcards.length
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
  writeFile(libro, 'Bodegas.xlsx')
}

export const ButtonExportBodegas = ({ datos }: { datos: Bodega[] }): JSX.Element => {
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