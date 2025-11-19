import { Filter, X, Leaf, ArrowRight } from "lucide-react";
import React from "react";
import { FilterState } from "./Store";

interface SidebaFilterPanelProps {
  showFilterPanel: boolean;
  setShowFilterPanel: (showFilterPanel: boolean) => void;
  activeCategory: string;
  handleFilter: (category: string) => void;
  handleShowAll: () => void;
  isLoading: boolean;
  categories: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const SidebaFilterPanel = ({
  showFilterPanel,
  setShowFilterPanel,
  activeCategory,
  handleFilter,
  handleShowAll,
  isLoading,
  categories,
  filters,
  onFiltersChange,
}: SidebaFilterPanelProps) => {
  const materials = ["Algodón Orgánico", "Bambú", "Reciclado", "Hemp", "Lino"];
  const origins = ["Local", "Nacional", "Europa", "Global"];
  const impacts = [
    { label: "Bajo", color: "text-yellow-600" },
    { label: "Medio", color: "text-green-500" },
    { label: "Alto", color: "text-green-600" },
  ];
  const priceRanges = [
    "Hasta €25",
    "€25 a €50",
    "€50 a €75",
    "€75 a €100",
    "Más de €100",
  ];

  const handleMaterialToggle = (material: string) => {
    const newMaterials = filters.materials.includes(material)
      ? filters.materials.filter((m) => m !== material)
      : [...filters.materials, material];

    onFiltersChange({ ...filters, materials: newMaterials });
  };

  const handleOriginChange = (origin: string) => {
    onFiltersChange({
      ...filters,
      origin: filters.origin === origin ? "" : origin,
    });
  };

  const handleImpactChange = (impact: string) => {
    onFiltersChange({
      ...filters,
      impact: filters.impact === impact ? "" : impact,
    });
  };

  const handlePriceRangeChange = (range: string) => {
    onFiltersChange({
      ...filters,
      priceRange: filters.priceRange === range ? "" : range,
      minPrice: "",
      maxPrice: "",
    });
  };

  const handleMinPriceChange = (value: string) => {
    onFiltersChange({ ...filters, minPrice: value, priceRange: "" });
  };

  const handleMaxPriceChange = (value: string) => {
    onFiltersChange({ ...filters, maxPrice: value, priceRange: "" });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];

    onFiltersChange({ ...filters, brands: newBrands });
  };

  return (
    <div
      className={`fixed lg:sticky lg:top-4 inset-y-0 left-0 z-30 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
        showFilterPanel ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } overflow-y-auto lg:h-fit lg:max-h-[calc(100vh-120px)]`}
    >
      {/* Filter Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between z-10">
        <h3 className="font-bold text-lg text-gray-900">Filtros</h3>
        <button
          onClick={() => setShowFilterPanel(false)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter Content */}
      <div className="p-6">
        {/* Materiales */}
        <div className="mb-8">
          <h4 className="font-bold text-base text-gray-900 mb-4">Materiales</h4>
          <div className="space-y-3">
            {materials.map((material) => (
              <label
                key={material}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => handleMaterialToggle(material)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                  />
                </div>
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {material}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Origen */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h4 className="font-bold text-base text-gray-900 mb-4">Origen</h4>
          <div className="space-y-3">
            {origins.map((origin) => (
              <label
                key={origin}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="origin"
                  checked={filters.origin === origin}
                  onChange={() => handleOriginChange(origin)}
                  className="w-5 h-5 border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {origin}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Impacto Ecológico */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h4 className="font-bold text-base text-gray-900 mb-4">
            Impacto Ecológico
          </h4>
          <div className="space-y-3">
            {impacts.map(({ label, color }) => (
              <label
                key={label}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="impact"
                  checked={filters.impact === label}
                  onChange={() => handleImpactChange(label)}
                  className="w-5 h-5 border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900 flex items-center gap-2">
                  <Leaf className={`w-4 h-4 ${color}`} />
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Precio */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <h4 className="font-bold text-base text-gray-900 mb-4">Precio</h4>
          <div className="space-y-3 mb-4">
            {priceRanges.map((range) => (
              <label
                key={range}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange === range}
                  onChange={() => handlePriceRangeChange(range)}
                  className="w-5 h-5 border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {range}
                </span>
              </label>
            ))}
          </div>

          {/* Rango personalizado */}
          <div className="mt-4">
            <p className="text-sm text-gray-700 mb-3">Rango personalizado</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Mín"
                value={filters.minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="text-gray-400">-</span>
              <input
                type="number"
                placeholder="Máx"
                value={filters.maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                <ArrowRight className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Marca - Placeholder */}
        <div className="mb-6">
          <h4 className="font-bold text-base text-gray-900 mb-4">Marca</h4>
          <div className="space-y-3">
            {["Patagonia", "Allbirds", "Veja", "Reformation", "Everlane"].map(
              (brand) => (
                <label
                  key={brand}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {brand}
                  </span>
                </label>
              )
            )}
          </div>
        </div>
      </div>

      {/* Clear Filters Button - Sticky at bottom */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
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