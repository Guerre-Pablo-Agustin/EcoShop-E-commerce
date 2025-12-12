import React, { useEffect } from "react";
import { Archive, Leaf, Loader2, TrendingUp, Users, DollarSign } from "lucide-react";
import { useSalesStore } from "@/store/sales.store";
import { useProductStore } from "@/store/product.store";
import { useCustomerStore } from "@/store/customer.store";

const BrandMain = () => {
  const {
    fetchAllTotal,
    data: salesData,
    isLoading: salesLoading,
    fetchStatistics,
    dataStatistics,
  } = useSalesStore();
  
  const {
    fetchProducts,
    products,
    isLoading: productsLoading,
  } = useProductStore();

  const {
    fetchCustomers,
    customers,
    isLoading: customersLoading,
  } = useCustomerStore();

  useEffect(() => {
    fetchAllTotal();
    fetchProducts();
    fetchCustomers();
    fetchStatistics();
  }, [fetchAllTotal, fetchProducts, fetchCustomers, fetchStatistics]);

  const totalCustomers = customers ? customers.length : 0;
  const totalSales = dataStatistics?.totalSales || 0;
  const currency = dataStatistics?.currency || "$";
  const activeProductsCount = products ? products.length : 0;
  const totalOrders = dataStatistics?.totalOrders || 0;
  const averageOrderValue = dataStatistics?.averageOrderValue || 0;

  console.log("products", products);
  console.log("customers", customers);
  console.log("salesData", salesData);
  console.log("salesStatistics", dataStatistics);

  if ((salesLoading || productsLoading || customersLoading) && !dataStatistics) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-gray-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Main Content Preview */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Dashboard Principal Admin
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Resumen general de tu marca ecológica
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  +12.5%
                </span>
              </div>
              <p className="text-sm mb-1">Clientes Totales</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {customersLoading ? "Cargando..." : `${totalCustomers}`}
              </p>
              <p className="text-xs mt-1">vs mes anterior</p>
            </div>

            <div className="p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">
                  +8.2%
                </span>
              </div>
              <p className="text-sm mb-1">Ventas Totales</p>
              <p className="text-2xl font-bold">
                {currency} {totalSales.toFixed(2)}
              </p>
              <p className="text-xs mt-1">Enero 2025</p>
            </div>

            <div className="p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5" />
                </div>
                <span className="text-sm text-red-600 dark:text-red-400">
                  -3
                </span>
              </div>
              <p className="text-sm mb-1">Productos Activos</p>
              <p className="text-2xl font-bold">
                {productsLoading ? "..." : activeProductsCount}
              </p>
              <p className="text-xs mt-1">15 inactivos</p>
            </div>

            <div className="p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">
                  Activo
                </span>
              </div>
              <p className="text-sm mb-1">Total Órdenes</p>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <p className="text-xs mt-1">este mes</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Desempeño de Ventas
                </h2>
                <select className="text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2">
                  <option>Últimos 6 meses</option>
                </select>
              </div>
              {dataStatistics ? (
                <div className="space-y-6">
                  {/* Total de Ventas */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Ventas Totales
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {currency} {totalSales.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all"
                        style={{ width: `${Math.min((totalSales / 10000) * 100, 100)}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-primary dark:text-primary-50 mix-blend-difference">
                        {Math.min((totalSales / 10000) * 100, 100).toFixed(1)}% del objetivo
                      </div>
                    </div>
                  </div>

                  {/* Valor Promedio por Orden */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Valor Promedio por Orden
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {currency} {averageOrderValue.toFixed(2)}
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                        style={{ width: `${Math.min((averageOrderValue / 500) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Total de Órdenes */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Total de Órdenes
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {totalOrders} órdenes
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all"
                        style={{ width: `${Math.min((totalOrders / 50) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Productos Activos vs Total */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Productos Activos
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activeProductsCount} productos
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                        style={{ width: `${Math.min((activeProductsCount / 20) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Clientes Totales */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Base de Clientes
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {totalCustomers} clientes
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-orange-500 to-orange-600 rounded-full transition-all"
                        style={{ width: `${Math.min((totalCustomers / 50) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <TrendingUp className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">No hay datos de ventas disponibles</p>
                </div>
              )}
            </div>

            <div className="p-6 rounded-xl border dark:border-gray-400">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Alertas de Stock
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Camiseta Orgánica
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Solo 2 unidades
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Bolsa Reciclada
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      8 unidades
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      Zapatos Bambú
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      1 unidad
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Environmental Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Huella de Carbono
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                2.4 t
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                CO₂ este mes
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                -15% vs mes anterior
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Reciclaje
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                87%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Materiales reciclados
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "87%" }}
                ></div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                +5% vs mes anterior
              </p>
            </div>

            <div className="p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Emisiones
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                1.2 t
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                CO₂ producción
              </p>
              <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mb-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="text-xs text-green-600 dark:text-green-400">
                -22% vs mes anterior
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandMain;