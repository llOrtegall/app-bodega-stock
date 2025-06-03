import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { Separator } from "@/components/ui/separator";
import { VITE_API_URL } from "@/config/enviroments";
import { PlusIcon, Trash2Icon, ArrowRight, Building2, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState, useMemo, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "axios";

interface SimcardI {
  _id: string
  numero: number,
  operador: string,
  estado: string,
  serial: string,
  apn: string,
  user: string,
  pass: string,
  createdAt: string,
  updatedAt: string,
  bodega: string
}

interface Bodega {
  _id: string
  sucursal: string
  nombre: string
  direccion: string
  updatedAt: string
}

export default function AsingSimcardToBodega() {
  const [simcards, setSimcards] = useState<SimcardI[]>([]);
  const [bodegas, setBodegas] = useState<Bodega[]>([])
  const [reload, setReload] = useState(false)
  const [loading, setLoading] = useState(true)
  const [assigning, setAssigning] = useState(false)
  const { company } = useAuth();

  const [bodegaSelected, setBodegaSelected] = useState<string>('')
  const [searchBog, setSearchBog] = useState('')

  const [simcarAdd, setSimcarAdd] = useState<string[]>([])

  // Memoizar bodegas filtradas
  const bodegafiltered = useMemo(() => {
    return bodegas.filter(({ nombre, sucursal, direccion }) => {
      return nombre.toLowerCase().includes(searchBog.toLowerCase()) ||
        sucursal.toString().toLowerCase().includes(searchBog.toLowerCase()) ||
        direccion.toLowerCase().includes(searchBog.toLowerCase())
    })
  }, [bodegas, searchBog])

  // Memoizar simcards seleccionadas con sus datos
  const selectedSimcardsData = useMemo(() => {
    return simcarAdd.map(id => simcards.find(sim => sim._id === id)).filter(Boolean)
  }, [simcarAdd, simcards])

  const handleAddItem = useCallback((id: string) => {
    setSimcarAdd(sim => {
      if (!sim.includes(id)) {
        return [...sim, id]
      } else {
        return sim
      }
    })
  }, [])

  const handleRemoveItem = useCallback((id: string) => {
    setSimcarAdd(preSims => {
      return preSims.filter(item => item !== id)
    })
  }, [])

  const fetchSimcards = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`${VITE_API_URL}/simcardWhitBodega/${company}`);
      setSimcards(res.data)
    } catch (error) {
      toast.error("Error al cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  const fetchDataBodegas = async () => {
    try {
      const res = await axios.get(`${VITE_API_URL}/getBodegas/${company}`)
      setBodegas(res.data)
    } catch (error) {
      toast.error("Error al cargar los datos")
    }
  }

  useEffect(() => {
    fetchSimcards()

    setTimeout(() => {
      fetchDataBodegas()
    }, 5000)
  }, [reload])

  const handleAssignItems = async () => {
    if (simcarAdd.length === 0) {
      toast.error('Debe seleccionar al menos un item')
      return
    }

    if (bodegaSelected === '') {
      toast.error('Debe seleccionar una bodega o sucursal')
      return
    }

    setAssigning(true)
    const loadingToast = toast.loading('Asignando items...')

    try {
      const response = await axios.post(`${VITE_API_URL}/addSimcardToBodega`, {
        simcardIds: simcarAdd,
        sucursal: parseInt(bodegaSelected),
        company: company
      })

      if (response.status === 200) {
        toast.success('Items asignados correctamente')
        setSimcarAdd([])
        setBodegaSelected('')
        setReload(!reload)
      }
    } catch (err: any) {
      console.log(err)
      toast.error('Error al asignar items', {
        description: err.response?.data?.error || 'Error desconocido'
      })
    } finally {
      setAssigning(false)
      toast.dismiss(loadingToast)
    }
  }

  // Función para obtener el color del operador
  const getOperatorColor = (operador: string) => {
    switch (operador) {
      case 'Claro': return 'bg-red-100 text-red-800 border-red-200'
      case 'Movistar': return 'bg-green-100 text-green-800 border-green-200'
      case 'Tigo': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header con estadísticas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Simcards</p>
                <p className="text-2xl font-bold text-blue-600">{simcards.length}</p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Building2 className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Sin Asignar</p>
                <p className="text-2xl font-bold text-green-600">{simcarAdd.length}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <PlusIcon className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Seleccionadas</p>
                <p className="text-2xl font-bold text-orange-600">{simcarAdd.length}</p>
              </div>
              <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        {/* Simcards Disponibles */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              Simcards Disponibles
              <Badge variant="secondary" className="ml-auto">
                {simcards.filter(sim => sim.bodega === 'No Asignado').length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[65vh] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead>Operador</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Serial</TableHead>
                    <TableHead className="text-center">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {simcards.filter(sim => sim.bodega === 'No Asignado').map((sim) => (
                    <TableRow key={sim._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getOperatorColor(sim.operador)} font-medium`}
                        >
                          {sim.operador}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{sim.numero}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{sim.serial}</TableCell>
                      <TableCell className="text-center">
                        {!simcarAdd.includes(sim._id) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 hover:bg-green-100 hover:border-green-300 transition-colors"
                            onClick={() => handleAddItem(sim._id)}
                          >
                            <PlusIcon className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {simcards.filter(sim => sim.bodega === 'No Asignado').length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No hay simcards disponibles para asignar
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Simcards Seleccionadas */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <div className="h-2 w-2 bg-orange-500 rounded-full animate-pulse"></div>
              Simcards Seleccionadas
              <Badge variant="secondary" className="ml-auto">
                {simcarAdd.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[65vh] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead>Operador</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Serial</TableHead>
                    <TableHead className="text-center">Acción</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedSimcardsData.map((sim) => sim && (
                    <TableRow key={sim._id} className="hover:bg-muted/50 transition-colors">
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`${getOperatorColor(sim.operador)} font-medium`}
                        >
                          {sim.operador}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{sim.numero}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">{sim.serial}</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 p-0 hover:bg-red-100 hover:border-red-300 transition-colors"
                          onClick={() => handleRemoveItem(sim._id)}
                        >
                          <Trash2Icon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {simcarAdd.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        Selecciona simcards para asignar
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Panel de Bodegas */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Building2 className="h-5 w-5 text-blue-600" />
              Bodegas - {company}
              <Badge variant="secondary" className="ml-auto">
                {bodegafiltered.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Filtro de búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar nombre, sucursal o dirección..."
                className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                value={searchBog}
                onChange={(e) => setSearchBog(e.target.value)}
              />
            </div>

            <Separator />

            {/* Selector de bodega */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Seleccionar Bodega:</Label>
              <Select
                value={bodegaSelected}
                onValueChange={(value) => setBodegaSelected(value)}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="Seleccionar bodega ó sucursal" />
                </SelectTrigger>
                <SelectContent>
                  {bodegafiltered.map((bodega) => (
                    <SelectItem key={bodega._id} value={bodega.sucursal}>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{bodega.sucursal}</span>
                        <span className="text-muted-foreground">- {bodega.nombre}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Información de la bodega seleccionada */}
            {bodegaSelected && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">Bodega Seleccionada:</h4>
                {(() => {
                  const selected = bodegas.find(b => b.sucursal === bodegaSelected)
                  return selected ? (
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Sucursal:</span> {selected.sucursal}</p>
                      <p><span className="font-medium">Nombre:</span> {selected.nombre}</p>
                      <p><span className="font-medium">Dirección:</span> {selected.direccion}</p>
                    </div>
                  ) : null
                })()}
              </div>
            )}

            {/* Botón de asignación */}
            <div className="pt-4">
              <Button
                onClick={handleAssignItems}
                disabled={assigning || simcarAdd.length === 0 || !bodegaSelected}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-[1.02]"
                size="lg"
              >
                {assigning ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Asignando...
                  </>
                ) : (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Asignar {simcarAdd.length} Simcard{simcarAdd.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}