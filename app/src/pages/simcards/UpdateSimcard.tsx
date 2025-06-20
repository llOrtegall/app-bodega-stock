import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { VITE_API_URL } from "@/config/enviroments";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface Simcard {
    _id: string;
    numero: string;
    operador: string;
    estado: string;
    serial: string;
    apn: string;
    user: string;
    pass: string;
}

interface UpdateSimcardProps {
    simcard: Simcard;
    onUpdate: () => void;
}

export default function UpdateSimcard({ simcard, onUpdate }: UpdateSimcardProps) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { company } = useAuth();

    const [formData, setFormData] = useState({
        id: simcard._id,
        operador: simcard.operador,
        serial: simcard.serial,
        numero: simcard.numero,
        estado: simcard.estado,
        apn: simcard.apn,
        user: simcard.user,
        pass: simcard.pass,
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar si hay cambios
        const hasChanges =
            formData.operador !== simcard.operador ||
            formData.serial !== simcard.serial ||
            formData.numero !== simcard.numero ||
            formData.estado !== simcard.estado ||
            formData.apn !== simcard.apn ||
            formData.user !== simcard.user ||
            formData.pass !== simcard.pass;

        if (!hasChanges) {
            toast.info('No se detectaron cambios');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Actualizando simcard...');

        try {
            const dataToSend = {
                id: formData.id,
                operador: formData.operador,
                serial: formData.serial,
                numero: formData.numero,
                estado: formData.estado,
                apn: formData.apn,
                user: formData.user,
                pass: formData.pass,
                company: company
            };

            const response = await axios.put(`${VITE_API_URL}/updateSimcard`, dataToSend);

            if (response.status === 200) {
                toast.success('Simcard actualizada correctamente');
                setOpen(false);
                onUpdate(); // Callback para refrescar la lista
            }
        } catch (error: any) {
            console.error('Error updating simcard:', error);
            toast.error('Error al actualizar simcard', {
                description: error.response?.data?.error || 'Error desconocido'
            });
        } finally {
            setLoading(false);
            toast.dismiss(loadingToast);
        }
    };

    const resetForm = () => {
        setFormData({
            id: simcard._id,
            operador: simcard.operador,
            serial: simcard.serial,
            numero: simcard.numero,
            estado: simcard.estado,
            apn: simcard.apn,
            user: simcard.user,
            pass: simcard.pass,
        });
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-blue-100 hover:border-blue-300 transition-colors"
                    onClick={() => {
                        resetForm();
                        setOpen(true);
                    }}
                >
                    <Edit className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent className="sm:max-w-md">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5" />
                        Actualizar Simcard
                    </SheetTitle>
                </SheetHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                    {/* Información no editable */}
                    <div className="grid grid-cols-1 gap-4 p-3 bg-muted/50 rounded-lg">
                        <div>
                            <Label className="text-xs text-muted-foreground">ID</Label>
                            <p className="text-sm font-mono truncate">{simcard._id}</p>
                        </div>
                    </div>

                    {/* Campos editables */}
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="operador">Operador *</Label>
                            <Select
                                value={formData.operador}
                                onValueChange={(value) => handleInputChange('operador', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar operador" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Claro">Claro</SelectItem>
                                    <SelectItem value="Movistar">Movistar</SelectItem>
                                    <SelectItem value="Tigo">Tigo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="serial">Serial *</Label>
                            <Input
                                id="serial"
                                type="text"
                                value={formData.serial}
                                onChange={(e) => handleInputChange('serial', e.target.value)}
                                placeholder="Serial de la simcard"
                                className="font-mono"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="numero">Número *</Label>
                            <Input
                                id="numero"
                                type="text"
                                value={formData.numero}
                                onChange={(e) => handleInputChange('numero', e.target.value)}
                                placeholder="Número de simcard"
                                className="font-mono"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="estado">Estado *</Label>
                            <Select
                                value={formData.estado}
                                onValueChange={(value) => handleInputChange('estado', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Seleccionar estado" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Activa">Activa</SelectItem>
                                    <SelectItem value="Inactiva">Inactiva</SelectItem>
                                    <SelectItem value="DeBaja">De Baja</SelectItem>
                                    <SelectItem value="Reposición">Reposición</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label htmlFor="apn">APN *</Label>
                            <Input
                                id="apn"
                                type="text"
                                value={formData.apn}
                                onChange={(e) => handleInputChange('apn', e.target.value)}
                                placeholder="Punto de acceso (APN)"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="user">Usuario *</Label>
                            <Input
                                id="user"
                                type="text"
                                value={formData.user}
                                onChange={(e) => handleInputChange('user', e.target.value)}
                                placeholder="Usuario de conexión"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="pass">Contraseña *</Label>
                            <Input
                                id="pass"
                                type="text"
                                value={formData.pass}
                                onChange={(e) => handleInputChange('pass', e.target.value)}
                                placeholder="Contraseña de conexión"
                                required
                            />
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className="min-w-24"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Actualizando...
                                </>
                            ) : (
                                'Actualizar'
                            )}
                        </Button>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
}
