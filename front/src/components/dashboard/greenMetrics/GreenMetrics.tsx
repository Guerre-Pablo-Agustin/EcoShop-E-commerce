import React, { useState } from 'react';
import { Leaf, Award, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import * as z from 'zod';

const metricsSchema = z.object({
  huellaCarbono: z.number().min(0, "Debe ser mayor o igual a 0"),
  emisionesTotales: z.number().min(0, "Debe ser mayor o igual a 0"),
  materialesReciclados: z.number().min(0).max(100, "Valor entre 0 y 100"),
  consumoEnergetico: z.number().min(0, "Debe ser mayor o igual a 0"),
  tipoTransporte: z.string().min(1, "Selecciona un tipo de transporte"),
  alcanceLogistico: z.string().min(1, "Selecciona un alcance logístico"),
});

export default function GreenMetricsForm() {
  const [formData, setFormData] = useState({
    huellaCarbono: 0,
    emisionesTotales: 0,
    materialesReciclados: 0,
    consumoEnergetico: 0,
    tipoTransporte: '',
    alcanceLogistico: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [score, setScore] = useState(0);

const updateField = (field: keyof MetricsData, value: string | number) => {
    const numValue = typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value as number;
    setFormData(prev => ({ ...prev, [field]: numValue }));
    
    // Recalcular puntaje
    calculateScore({ ...formData, [field]: numValue } as MetricsData);
    
    if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
    }
};

interface MetricsData {
    huellaCarbono: number;
    emisionesTotales: number;
    materialesReciclados: number;
    consumoEnergetico: number;
    tipoTransporte: string;
    alcanceLogistico: string;
}

const calculateScore = (data: MetricsData): void => {
    let totalScore: number = 0;
    
    // Lógica simple de puntuación
    if (data.huellaCarbono < 50) totalScore += 25;
    if (data.emisionesTotales < 50) totalScore += 25;
    if (data.materialesReciclados > 50) totalScore += 25;
    if (data.consumoEnergetico < 100) totalScore += 25;
    
    setScore(totalScore);
};

  const getBadgeLevel = () => {
    if (score >= 85) return { name: 'Platinum', color: 'bg-gray-400', textColor: 'text-gray-800' };
    if (score >= 70) return { name: 'Gold', color: 'bg-yellow-500', textColor: 'text-yellow-900' };
    if (score >= 50) return { name: 'Silver', color: 'bg-gray-300', textColor: 'text-gray-700' };
    return { name: 'Bronze', color: 'bg-orange-600', textColor: 'text-white' };
  };

  const handleSubmit = () => {
    try {
      metricsSchema.parse(formData);
      console.log('Métricas guardadas:', formData);
      setErrors({});
      alert('¡Métricas guardadas exitosamente!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string | undefined> = {};
        error.issues.forEach((err) => {
          const key = err.path && err.path[0] ? String(err.path[0]) : undefined;
          if (key) {
            newErrors[key] = err.message;
          }
        });
        setErrors(newErrors);
      } else {
        console.error(error);
      }
    }
  };

  const badge = getBadgeLevel();

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <h1 className="text-2xl font-bold text-gray-900">Carga de Métricas Verdes</h1>
          </div>
          <p className="text-gray-600 text-sm">
            Ingresa los datos de sostenibilidad de tu producto. El Eco-Badge se calculará automáticamente en tiempo real.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Emisiones y Huella de Carbono */}
            <Card className="bg-primary-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h3 className="font-semibold text-gray-900">Emisiones y Huella de Carbono</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="huellaCarbono" className="text-sm">
                        Huella de Carbono (kg CO₂)
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Input
                      id="huellaCarbono"
                      type="number"
                      value={formData.huellaCarbono}
                      onChange={(e) => updateField('huellaCarbono', e.target.value)}
                      className={errors.huellaCarbono ? 'border-red-500' : ''}
                    />
                    {errors.huellaCarbono && (
                      <p className="text-xs text-red-500">{errors.huellaCarbono}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="emisionesTotales" className="text-sm">
                        Emisiones Totales (kg CO₂)
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Input
                      id="emisionesTotales"
                      type="number"
                      value={formData.emisionesTotales}
                      onChange={(e) => updateField('emisionesTotales', e.target.value)}
                      className={errors.emisionesTotales ? 'border-red-500' : ''}
                    />
                    {errors.emisionesTotales && (
                      <p className="text-xs text-red-500">{errors.emisionesTotales}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materiales y Energía */}
            <Card className="bg-primary-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <h3 className="font-semibold text-gray-900">Materiales y Energía</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="materialesReciclados" className="text-sm">
                        Materiales Reciclados (%)
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Input
                      id="materialesReciclados"
                      type="number"
                      value={formData.materialesReciclados}
                      onChange={(e) => updateField('materialesReciclados', e.target.value)}
                      className={errors.materialesReciclados ? 'border-red-500' : ''}
                    />
                    {errors.materialesReciclados && (
                      <p className="text-xs text-red-500">{errors.materialesReciclados}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="consumoEnergetico" className="text-sm">
                        Consumo Energético (kWh)
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Input
                      id="consumoEnergetico"
                      type="number"
                      value={formData.consumoEnergetico}
                      onChange={(e) => updateField('consumoEnergetico', e.target.value)}
                      className={errors.consumoEnergetico ? 'border-red-500' : ''}
                    />
                    {errors.consumoEnergetico && (
                      <p className="text-xs text-red-500">{errors.consumoEnergetico}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">Valor entre 0 y 100</p>
              </CardContent>
            </Card>

            {/* Transporte y Logística */}
             <Card className="bg-primary-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <h3 className="font-semibold text-gray-900">Transporte y Logística</h3>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="tipoTransporte" className="text-sm">
                        Tipo de Transporte
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Select 
                      value={formData.tipoTransporte}
                      onValueChange={(value) => updateField('tipoTransporte', value)}
                    >
                      <SelectTrigger className={errors.tipoTransporte ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Eléctrico" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrico">Eléctrico</SelectItem>
                        <SelectItem value="hibrido">Híbrido</SelectItem>
                        <SelectItem value="diesel">Diésel</SelectItem>
                        <SelectItem value="gasolina">Gasolina</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.tipoTransporte && (
                      <p className="text-xs text-red-500">{errors.tipoTransporte}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Label htmlFor="alcanceLogistico" className="text-sm">
                        Alcance Logístico
                      </Label>
                      <Info className="w-3 h-3 text-gray-400" />
                    </div>
                    <Select 
                      value={formData.alcanceLogistico}
                      onValueChange={(value) => updateField('alcanceLogistico', value)}
                    >
                      <SelectTrigger className={errors.alcanceLogistico ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Local (<50km)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">Local (&lt;50km)</SelectItem>
                        <SelectItem value="regional">Regional (50-200km)</SelectItem>
                        <SelectItem value="nacional">Nacional (200-1000km)</SelectItem>
                        <SelectItem value="internacional">Internacional (&gt;1000km)</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.alcanceLogistico && (
                      <p className="text-xs text-red-500">{errors.alcanceLogistico}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSubmit}
                className="bg-green-700 hover:bg-green-800 text-white px-8"
              >
                Guardar Métricas Verdes
              </Button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
             <Card className="bg-primary-500">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-4">Preview en Tiempo Real</h3>
                
                <div className=" rounded-lg p-6 text-center space-y-4">
                  <div className={`w-20 h-20 rounded-full ${badge.color} flex items-center justify-center mx-auto`}>
                    <Award className={`w-10 h-10 ${badge.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Eco-Badge Preview</h4>
                    <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${badge.color} ${badge.textColor}`}>
                      {badge.name}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Puntuación Sostenible</span>
                      <span className="font-semibold">{score}/100</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span>Ingresa métricas para calcular</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 pt-2">
                    Este badge se mostrará en tus productos según las métricas ingresadas
                  </p>
                </div>
              </CardContent>
            </Card>

             <Card className="bg-primary-500">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Criterios de Evaluación</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <span className="font-medium">Bronze (0-49):</span> Compromiso inicial sostenible</li>
                  <li>• <span className="font-medium">Silver (50-69):</span> Compromiso moderado</li>
                  <li>• <span className="font-medium">Gold (70-84):</span> Alto compromiso ambiental</li>
                  <li>• <span className="font-medium">Platinum (85-100):</span> Excelencia sostenible</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}