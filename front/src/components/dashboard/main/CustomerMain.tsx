import React, { useEffect } from "react";
import { Archive, Leaf, Loader2, FileText, DollarSign } from "lucide-react";
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
              <p className="text-sm  mb-1">Puntuación de ecoeficiencia </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 ">
                {latestReport?.ecoEfficiencyScore || 0}
              </p>
            </div>

            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-green-600" />
                </div>
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
              </div>
              <p className="text-sm  mb-1">total Ordenes</p>
              <p className="text-2xl font-bold ">
                {latestReport?.totalOrders || 0}
              </p>
            </div>

            <div className=" p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 border border-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 text-lg font-bold">
                    <DollarSign className="w-5 h-5 " />
                  </span>
                </div>
              </div>
              <p className="text-sm  mb-1">total gastado</p>
              <p className="text-2xl font-bold ">
                {latestReport?.totalAmountSpent || 0}
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="lg:col-span-2 p-6 rounded-xl border ">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Desempeño de Impacto
                </h2>
                <select className="text-sm border border-gray-200 dark:border-gray-700 dark:bg-gray-800 rounded-lg px-3 py-2 ">
                  <option>Últimos 6 meses</option>
                </select>
              </div>
              {latestReport ? (
                <div className="space-y-6">
                  {/* CO2 Comparación */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        CO₂ Ahorrado vs Huella
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {latestReport.totalCO2Saved} t /{" "}
                        {latestReport.totalCO2Footprint} t
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-green-500 to-green-600 rounded-full transition-all"
                        style={{
                          width: `${
                            ((latestReport.totalCO2Saved || 0) /
                              (latestReport.totalCO2Footprint || 1)) *
                            100
                          }%`,
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white mix-blend-difference">
                        {(
                          ((latestReport?.totalCO2Saved || 0) /
                            (latestReport?.totalCO2Footprint || 1)) *
                          100
                        ).toFixed(1)}
                        % Ahorrado
                      </div>
                    </div>
                  </div>

                  {/* Puntuación Ecoeficiencia */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Puntuación Ecoeficiencia
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {latestReport.ecoEfficiencyScore} / 100
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                        style={{
                          width: `${latestReport.ecoEfficiencyScore || 0}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* EcoPoints Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        EcoPoints Ganados
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {latestReport.ecoPointsEarned} pts
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-emerald-500 to-emerald-600 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            ((latestReport?.ecoPointsEarned || 0) / 100) * 100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Nivel de Impacto */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Nivel de Impacto
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          latestReport.impactLevel === "ALTO"
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : latestReport.impactLevel === "MEDIO"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {latestReport.impactLevel}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {["BAJO", "MEDIO", "ALTO"].map((level, idx) => (
                        <div
                          key={level}
                          className={`flex-1 h-8 rounded ${
                            level === latestReport.impactLevel
                              ? level === "ALTO"
                                ? "bg-green-500"
                                : level === "MEDIO"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                              : "bg-gray-200 dark:bg-gray-700"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Productos Sostenibles */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Elecciones Sostenibles
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {latestReport.sustainableChoicesCount} productos
                      </span>
                    </div>
                    <div className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="absolute h-full bg-linear-to-r from-teal-500 to-teal-600 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            ((latestReport?.sustainableChoicesCount || 0) /
                              15) *
                              100,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <FileText className="w-8 h-8 mb-2 opacity-50" />
                  <p className="text-sm">
                    No hay datos de desempeño disponibles
                  </p>
                </div>
              )}
            </div>

            {/* Categorias con mas impacto */}
            <div className=" p-6 rounded-xl border dark:border-gray-400">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6">
                Categorias con mas impacto
              </h2>
              <div className="space-y-4">
                {latestReport?.categoryImpactBreakdown &&
                Object.keys(latestReport.categoryImpactBreakdown).length > 0 ? (
                  <div className="p-4 rounded-lg">
                    {Object.entries(latestReport.categoryImpactBreakdown).map(
                      ([categoryName, impact]) => (
                        <div key={categoryName} className="mb-2 last:mb-0">
                          <p className="text-sm font-medium mb-1">
                            {categoryName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Impacto: {Number(impact).toFixed(2)}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <FileText className="w-8 h-8 mb-2 opacity-50" />
                    <p className="text-sm">No hay reportes</p>
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
                {latestReport?.totalCO2Footprint || 0}
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
                {latestReport?.sustainabilityPercentage || 0} %
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
                {latestReport?.totalCO2Saved || 0} t
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerMain;
