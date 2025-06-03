import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertTriangle, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/auth/AuthProvider";
import { VITE_API_URL } from "@/config/enviroments";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

interface SimcardData {
  numero: string;
  operador: string;
  estado: string;
  serial: string;
  apn: string;
  user: string;
  pass: string;
  isValid: boolean;
  errors: string[];
}

const REQUIRED_FIELDS = ['numero', 'operador', 'estado', 'serial', 'apn', 'user', 'pass'];

export default function NewSimcard() {
  const [inputText, setInputText] = useState<string>('');
  const [simcards, setSimcards] = useState<SimcardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { company } = useAuth();

  const validateSimcard = (fields: string[]): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];
    
    if (fields.length !== 7) {
      errors.push(`Se requieren exactamente 7 campos, se encontraron ${fields.length}`);
    }
    
    fields.forEach((field, index) => {
      if (!field.trim()) {
        errors.push(`Campo ${index + 1} (${REQUIRED_FIELDS[index]}) está vacío`);
      }
    });

    // Validaciones específicas
    if (fields[0] && !/^\d{10,15}$/.test(fields[0].trim())) {
      errors.push('El número debe contener solo dígitos (10-15 caracteres)');
    }

    // Validar operador
    if (fields[1] && !['Claro', 'Movistar', 'Tigo'].includes(fields[1].trim())) {
      errors.push('Operador debe ser: Claro, Movistar o Tigo');
    }

    // Validar estado
    if (fields[2] && !['Activa', 'Inactiva', 'DeBaja'].includes(fields[2].trim())) {
      errors.push('Estado debe ser: Activa, Inactiva o DeBaja');
    }

    // Validar serial
    if (fields[3] && (!/^\d+$/.test(fields[3].trim()) || fields[3].trim().length < 6)) {
      errors.push('Serial debe ser un número de al menos 6 dígitos');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setInputText(input);
    
    if (!input.trim()) {
      setSimcards([]);
      return;
    }

    const lines = input.split('\n').filter(line => line.trim());
    const parsedSimcards: SimcardData[] = lines.map((line) => {
      const fields = line.split(',').map(field => field.trim());
      const validation = validateSimcard(fields);
      
      return {
        numero: fields[0] || '',
        operador: fields[1] || '',
        estado: fields[2] || '',
        serial: fields[3] || '',
        apn: fields[4] || '',
        user: fields[5] || '',
        pass: fields[6] || '',
        isValid: validation.isValid,
        errors: validation.errors
      };
    });
    
    setSimcards(parsedSimcards);
  };

  const handleSubmit = async () => {
    const validSimcards = simcards.filter(simcard => simcard.isValid);
    
    if (validSimcards.length === 0) {
      alert('No hay simcards válidas para procesar');
      return;
    }

    setIsLoading(true);
    try {
      const simcardsToSend = validSimcards.map(simcard => ({
        numero: simcard.numero,
        operador: simcard.operador,
        estado: simcard.estado,
        serial: simcard.serial,
        apn: simcard.apn,
        user: simcard.user,
        pass: simcard.pass,
        company
      }));

      const reponse = await axios.post(`${VITE_API_URL}/createMultipleSimcards`, { simcards: simcardsToSend, company })

      if (reponse.status === 201) {
        alert('Simcards procesadas exitosamente');
        setSimcards([]);
        setInputText('');
      } else {
        alert('Error al procesar las simcards');
      }


    } catch (error) {
      console.error('Error al procesar simcards:', error);
      alert('Error de conexión al procesar las simcards');
    } finally {
      setIsLoading(false);
    }
  };

  const validCount = simcards.filter(s => s.isValid).length;
  const invalidCount = simcards.length - validCount;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Generación Masiva de Simcards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Formato requerido por línea:</strong><br />
              numero, operador, estado, serial, apn, user, pass<br />
              <span className="text-sm text-muted-foreground">
                Ejemplo: 3001234567, Claro, Activo, SIM123456, internet.comcel.com.co, user1, pass1
              </span>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Input Section */}
      <Card>
        <CardHeader>
          <Label htmlFor="simcards-input">
            Datos de Simcards (una por línea)
          </Label>
        </CardHeader>
        <CardContent>
          <Textarea 
            id="simcards-input"
            placeholder="Ingresa los datos de las simcards, una por línea:&#10;3001234567, Claro, Activo, SIM123456, internet.comcel.com.co, user1, pass1&#10;3007654321, Movistar, Activo, SIM789012, internet.movistar.com.co, user2, pass2"
            value={inputText}
            onChange={handleTextareaChange}
            className="min-h-32 font-mono text-sm"
          />
          
          {simcards.length > 0 && (
            <div className="flex items-center gap-4 mt-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                Válidas: {validCount}
              </Badge>
              {invalidCount > 0 && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Inválidas: {invalidCount}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {simcards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Vista Previa de Simcards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {simcards.map((simcard, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    simcard.isValid
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium flex items-center gap-2">
                      {simcard.isValid ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      Simcard {index + 1}
                    </h4>
                    <Badge variant={simcard.isValid ? "default" : "destructive"}>
                      {simcard.isValid ? "Válida" : "Inválida"}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div><strong>Número:</strong> {simcard.numero}</div>
                    <div><strong>Operador:</strong> {simcard.operador}</div>
                    <div><strong>Estado:</strong> {simcard.estado}</div>
                    <div><strong>Serial:</strong> {simcard.serial}</div>
                    <div><strong>APN:</strong> {simcard.apn}</div>
                    <div><strong>User:</strong> {simcard.user}</div>
                    <div><strong>Pass:</strong> {simcard.pass}</div>
                  </div>
                  
                  {!simcard.isValid && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-red-700">Errores:</p>
                      <ul className="text-sm text-red-600 list-disc list-inside">
                        {simcard.errors.map((error, errorIndex) => (
                          <li key={errorIndex}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Section */}
      {validCount > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  {validCount} simcard{validCount !== 1 ? 's' : ''} lista{validCount !== 1 ? 's' : ''} para procesar
                </p>
              </div>
              <Button 
                onClick={handleSubmit}
                disabled={isLoading || validCount === 0}
                className="min-w-32"
              >
                {isLoading ? 'Procesando...' : `Crear ${validCount} Simcard${validCount !== 1 ? 's' : ''}`}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}