import { Filter, X } from "lucide-react";
import React from "react";

interface SidebaFilterPanelProps {
  showFilterPanel: boolean;
  setShowFilterPanel: (showFilterPanel: boolean) => void;
  activeCategory: string;
  handleFilter: (category: string) => void;
  handleShowAll: () => void;
  isLoading: boolean;
  categories: string[];
}

const SidebaFilterPanel = ({
  showFilterPanel,
  setShowFilterPanel,
  activeCategory,
  handleFilter,
  handleShowAll,
  isLoading,
  categories,
}: SidebaFilterPanelProps) => {
  return (
    <div
      className={`fixed lg:relative inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        showFilterPanel ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } overflow-y-auto`}
    >
      {/* Filter Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-700" />
          <h3 className="font-bold text-lg text-gray-900">Filtros</h3>
        </div>
        <button
          onClick={() => setShowFilterPanel(false)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Content */}
      <div className="p-4">
        {/* Categories */}
        <div className="mb-6">
          <h4 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
            Categorías
          </h4>
          <div className="space-y-2">
            <button
              onClick={handleShowAll}
              disabled={isLoading}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                activeCategory === "Todos"
                  ? "bg-green-600 text-white"
                  : "bg-gray-50 text-gray-700 hover:bg-gray-100"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                disabled={isLoading}
                className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all ${
                  activeCategory === category
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Impact Filters - Placeholder for future features */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
            Impacto Ambiental
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                Alta reciclabilidad (+80%)
              </span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                Bajo consumo de agua
              </span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">
                Huella de carbono baja
              </span>
            </label>
          </div>
        </div>

        {/* Price Range - Placeholder */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h4 className="font-semibold text-sm text-gray-700 mb-3 uppercase tracking-wide">
            Rango de Precio
          </h4>
          <div className="space-y-2">
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Menos de $20</span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">$20 - $50</span>
            </label>
            <label className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
              />
              <span className="text-sm text-gray-700">Más de $50</span>
            </label>
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleShowAll}
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Limpiar Filtros
        </button>
      </div>
    </div>
  );
};

export default SidebaFilterPanel;
