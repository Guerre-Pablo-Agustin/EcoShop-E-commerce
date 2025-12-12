import React, { useState, useEffect } from 'react';
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

interface MetricsData {
  huellaCarbono: number;
  emisionesTotales: number;
  materialesReciclados: number;
  consumoEnergetico: number;
  tipoTransporte: string;
  alcanceLogistico: string;
}

export default function GreenMetricsForm() {
  const [formData, setFormData] = useState<MetricsData>({
    huellaCarbono: 0,
    emisionesTotales: 0,
    materialesReciclados: 0,
    consumoEnergetico: 0,
    tipoTransporte: '',
    alcanceLogistico: '',
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [score, setScore] = useState(0);

  // Calcular score automáticamente cuando cambien los datos
  useEffect(() => {
    calculateScore(formData);
  }, [formData]);

  const updateField = (field: keyof MetricsData, value: string | number) => {
    const numValue = typeof value === 'string' && value !== '' && !isNaN(Number(value)) 
      ? Number(value) 
      : value;
    
    setFormData(prev => ({ ...prev, [field]: numValue }));
    
    // Limpiar error del campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const calculateScore = (data: MetricsData): void => {
    let totalScore: number = 0;
    
    // Emisiones y Huella (40 puntos total)
    if (data.huellaCarbono <= 20) totalScore += 20;
    else if (data.huellaCarbono <= 50) totalScore += 15;
    else if (data.huellaCarbono <= 100) totalScore += 10;
    else if (data.huellaCarbono <= 200) totalScore += 5;
    
    if (data.emisionesTotales <= 30) totalScore += 20;
    else if (data.emisionesTotales <= 60) totalScore += 15;
    else if (data.emisionesTotales <= 120) totalScore += 10;
    else if (data.emisionesTotales <= 250) totalScore += 5;
    
    // Materiales Reciclados (25 puntos)
    if (data.materialesReciclados >= 80) totalScore += 25;
    else if (data.materialesReciclados >= 60) totalScore += 20;
    else if (data.materialesReciclados >= 40) totalScore += 15;
    else if (data.materialesReciclados >= 20) totalScore += 10;
    else if (data.materialesReciclados > 0) totalScore += 5;
    
    // Consumo Energético (15 puntos)
    if (data.consumoEnergetico <= 50) totalScore += 15;
    else if (data.consumoEnergetico <= 100) totalScore += 12;
    else if (data.consumoEnergetico <= 200) totalScore += 8;
    else if (data.consumoEnergetico <= 400) totalScore += 4;
    
    // Tipo de Transporte (12 puntos)
    const transportScores: Record<string, number> = {
      'electrico': 12,
      'hibrido': 8,
      'diesel': 4,
      'gasolina': 2,
    };
    totalScore += transportScores[data.tipoTransporte] || 0;
    
    // Alcance Logístico (8 puntos)
    const alcanceScores: Record<string, number> = {
      'local': 8,
      'regional': 6,
      'nacional': 4,
      'internacional': 2,
    };
    totalScore += alcanceScores[data.alcanceLogistico] || 0;
    
    setScore(Math.min(totalScore, 100));
  };

  const getBadgeLevel = () => {
    if (score >= 85) return { 
      name: 'Platinum', 
      color: 'bg-gradient-to-br from-gray-300 to-gray-500', 
      textColor: 'text-white',
      ringColor: 'ring-gray-400'
    };
    if (score >= 70) return { 
      name: 'Gold', 
      color: 'bg-gradient-to-br from-yellow-300 to-yellow-600', 
      textColor: 'text-yellow-900',
      ringColor: 'ring-yellow-500'
    };
    if (score >= 50) return { 
      name: 'Silver', 
      color: 'bg-gradient-to-br from-gray-200 to-gray-400', 
      textColor: 'text-gray-800',
      ringColor: 'ring-gray-400'
    };
    return { 
      name: 'Bronze', 
      color: 'bg-gradient-to-br from-orange-400 to-orange-700', 
      textColor: 'text-white',
      ringColor: 'ring-orange-500'
    };
  };

  const handleSubmit = () => {
    try {
      metricsSchema.parse(formData);
      console.log('Métricas guardadas:', formData);
      console.log('Score final:', score);
      setErrors({});
      alert(`¡Métricas guardadas exitosamente!\n\nBadge obtenido: ${getBadgeLevel().name}\nPuntuación: ${score}/100`);
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
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
            <Card className="bg-white">
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
                      min="0"
                      value={formData.huellaCarbono || ''}
                      onChange={(e) => updateField('huellaCarbono', e.target.value)}
                      className={errors.huellaCarbono ? 'border-red-500' : ''}
                      placeholder="0"
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
                      min="0"
                      value={formData.emisionesTotales || ''}
                      onChange={(e) => updateField('emisionesTotales', e.target.value)}
                      className={errors.emisionesTotales ? 'border-red-500' : ''}
                      placeholder="0"
                    />
                    {errors.emisionesTotales && (
                      <p className="text-xs text-red-500">{errors.emisionesTotales}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Materiales y Energía */}
            <Card className="bg-white">
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
                      min="0"
                      max="100"
                      value={formData.materialesReciclados || ''}
                      onChange={(e) => updateField('materialesReciclados', e.target.value)}
                      className={errors.materialesReciclados ? 'border-red-500' : ''}
                      placeholder="0"
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
                      min="0"
                      value={formData.consumoEnergetico || ''}
                      onChange={(e) => updateField('consumoEnergetico', e.target.value)}
                      className={errors.consumoEnergetico ? 'border-red-500' : ''}
                      placeholder="0"
                    />
                    {errors.consumoEnergetico && (
                      <p className="text-xs text-red-500">{errors.consumoEnergetico}</p>
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-500">El porcentaje de materiales reciclados debe estar entre 0 y 100</p>
              </CardContent>
            </Card>

            {/* Transporte y Logística */}
            <Card className="bg-white">
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
                        <SelectValue placeholder="Selecciona tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrico">⚡ Eléctrico</SelectItem>
                        <SelectItem value="hibrido">🔋 Híbrido</SelectItem>
                        <SelectItem value="diesel">⛽ Diésel</SelectItem>
                        <SelectItem value="gasolina">🛢️ Gasolina</SelectItem>
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
                        <SelectValue placeholder="Selecciona alcance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="local">📍 Local (&lt;50km)</SelectItem>
                        <SelectItem value="regional">🗺️ Regional (50-200km)</SelectItem>
                        <SelectItem value="nacional">🌍 Nacional (200-1000km)</SelectItem>
                        <SelectItem value="internacional">✈️ Internacional (&gt;1000km)</SelectItem>
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
                className="bg-green-600 hover:bg-green-700 text-white px-8"
              >
                Guardar Métricas Verdes
              </Button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="bg-white top-4">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-center mb-4 text-gray-900">Preview en Tiempo Real</h3>
                
                <div className="bg-linear-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6 text-center space-y-4">
                  <div className={`w-24 h-24 rounded-full ${badge.color} ring-4 ${badge.ringColor} flex items-center justify-center mx-auto shadow-lg`}>
                    <Award className={`w-12 h-12 ${badge.textColor}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2 text-gray-900">Eco-Badge Preview</h4>
                    <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${badge.color} ${badge.textColor} shadow-md`}>
                      {badge.name}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Puntuación Sostenible</span>
                      <span className="font-bold text-xl text-green-600">{score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-linear-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${score}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Leaf className="w-4 h-4 text-green-600" />
                      <span>{score > 0 ? '¡Calculando impacto!' : 'Ingresa métricas para calcular'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 pt-2">
                    Este badge se mostrará en tus productos según las métricas ingresadas
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-center mb-3 text-gray-900">Criterios de Evaluación</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span><span className="font-medium">Bronze (0-49):</span> Compromiso inicial sostenible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-400 font-bold">•</span>
                    <span><span className="font-medium">Silver (50-69):</span> Compromiso moderado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-500 font-bold">•</span>
                    <span><span className="font-medium">Gold (70-84):</span> Alto compromiso ambiental</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gray-500 font-bold">•</span>
                    <span><span className="font-medium">Platinum (85-100):</span> Excelencia sostenible</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}