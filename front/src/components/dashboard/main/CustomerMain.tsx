import React, { useEffect } from "react";
import { Archive, Leaf, Loader2, FileText } from "lucide-react";
import { useCustomerStore } from "@/store/customer.store";
import { useAuthStore } from "@/store/auth.store";
import { useReportsStore } from "@/store/reports.store";

const CustomerMain = () => {
  const { user } = useAuthStore();

  const {
    fetchCustomerByEmail,
    currentCustomer,
    isLoading: isLoadingCustomer,
  } = useCustomerStore();

  const {
    fetchCustomerStats,
    fetchLatestReportByCustomer,
    stats,
    latestReport,
    isLoading: isLoadingReports,
  } = useReportsStore();

  useEffect(() => {
    fetchCustomerByEmail(user?.email || "");
  }, [user]);

  useEffect(() => {
    if (currentCustomer?.id) {
      fetchCustomerStats(currentCustomer.id);
      fetchLatestReportByCustomer(currentCustomer.id);
    }
  }, [currentCustomer]);

  console.log("currentCustomer", currentCustomer);

  if (isLoadingCustomer && !currentCustomer) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin" />
      </div>
    );
  }


  console.log("stats", stats);
  console.log("latestReport", latestReport);


  return (
    <div>
      {/* Main Content Preview */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Dashboard Principal
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Resumen general de tu impacto ecológico
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                  Activo
                </span>
              </div>
              <p className="text-sm  mb-1">total CO2S </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 ">
                {stats?.totalCO2Saved || 0}
              </p>
              <p className="text-xs  mt-1">Totales</p>
            </div>

            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm text-green-600 font-medium">Avg</span>
              </div>
              <p className="text-sm  mb-1">total EcoPoints</p>
              <p className="text-2xl font-bold ">
                {stats?.totalEcoPoints || 0}
              </p>
            </div>

            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 " />
                </div>
                <span className="text-sm text-red-600 dark:text-red-400">
                  -3
                </span>
              </div>
              <p className="text-sm  mb-1">total Ordenes</p>
              <p className="text-2xl font-bold ">{latestReport?.totalOrders || 0}</p>
            </div>

            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">!</span>
                </div>
                <span className="text-sm text-red-600 dark:text-red-400">
                  Crítico
                </span>
              </div>
              <p className="text-sm  mb-1">Stock Crítico</p>
              <p className="text-2xl font-bold ">8</p>
              <p className="text-xs  mt-1">productos</p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="lg:col-span-2 p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Desempeño de Impacto
                </h2>
                <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 ">
                  <option>Últimos 6 meses</option>
                </select>
              </div>
              <div className="h-64 flex items-center justify-center ">
                Gráfico de líneas - Impacto mensual
              </div>
            </div>

            <div className=" p-6 rounded-xl border dark:border-gray-400">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Último Reporte
              </h2>
              <div className="space-y-4">
                {latestReport ? (
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium mb-1">
                      ID: {latestReport.id}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">
                      Generado:{" "}
                      {new Date(
                        latestReport.generatedDate
                      ).toLocaleDateString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {latestReport.totalImpact
                          ? `Impacto: ${latestReport.totalImpact}`
                          : "Procesado"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <FileText className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No hay reportes recientes</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Environmental Impact Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className=" p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-gray-700 dark:text-gray-100" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  Huella de Carbono
                </h3>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {currentCustomer?.carbonFootprint
                  ? `${currentCustomer.carbonFootprint} t`
                  : "0 t"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                CO₂ acumulado
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

            <div className=" p-6 rounded-xl border border-gray-200">
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

            <div className=" p-6 rounded-xl border border-gray-200">
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

export default CustomerMain;
