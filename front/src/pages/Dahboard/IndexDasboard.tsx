
import React from 'react'
import {
  Archive,
  Leaf
} from "lucide-react"

const IndexDasboard = () => {
  return (
    <div>
         {/* Main Content Preview */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Dashboard Principal
            </h1>
            <p className="text-gray-600">
              Resumen general de tu marca ecológica
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">$</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Ventas Totales</p>
              <p className="text-2xl font-bold text-gray-900">$47,832</p>
              <p className="text-xs text-gray-500 mt-1">vs mes anterior</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">$</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+8.2%</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Ventas Mensuales</p>
              <p className="text-2xl font-bold text-gray-900">$12,450</p>
              <p className="text-xs text-gray-500 mt-1">Enero 2025</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-white" />
                </div>
                <span className="text-sm text-gray-500">-3</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Productos Activos</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-xs text-gray-500 mt-1">15 inactivos</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">!</span>
                </div>
                <span className="text-sm text-gray-500">Crítico</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Stock Crítico</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-gray-500 mt-1">productos</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Desempeño de Ventas
                </h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-600">
                  <option>Últimos 6 meses</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center text-gray-400">
                Gráfico de líneas - Ventas mensuales
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Alertas de Stock
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Camiseta Orgánica
                    </p>
                    <p className="text-xs text-gray-500">Solo 2 unidades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Bolsa Reciclada
                    </p>
                    <p className="text-xs text-gray-500">8 unidades</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-gray-900 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Zapatos Bambú
                    </p>
                    <p className="text-xs text-gray-500">1 unidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Huella de Carbono</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">2.4 t</p>
              <p className="text-sm text-gray-600 mb-3">CO₂ este mes</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <p className="text-xs text-green-600">-15% vs mes anterior</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-gray-700" />
                </div>
                <h3 className="font-semibold text-gray-900">Reciclaje</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">87%</p>
              <p className="text-sm text-gray-600 mb-3">Materiales reciclados</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "87%" }}></div>
              </div>
              <p className="text-xs text-green-600">+5% vs mes anterior</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Emisiones</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 mb-2">1.2 t</p>
              <p className="text-sm text-gray-600 mb-3">CO₂ producción</p>
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <p className="text-xs text-green-600">-22% vs mes anterior</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndexDasboard