import React from "react";
import { Button } from "../ui/button";
import { products } from "@/data/products";
import { ProductCard } from "../Products/ProductCard";
import { Filter, Loader2, Recycle, Search, X } from "lucide-react";
import { SearchBar } from "./searchBar";
import SidebaFilterPanel from "./SidebaFilterPanel";

export default function Store() {
  const [productsFiltered, setProductsFiltered] = React.useState(products);
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [showFilterPanel, setShowFilterPanel] = React.useState(false);
 

  const categories = [...new Set(products.map((p) => p.category))];

  const applyFilters = (category: string, search: string) => {
    setIsLoading(true);

    setTimeout(() => {
      let filtered = products;

      // Filtrar por categoría
      if (category !== "Todos") {
        filtered = filtered.filter((product) => product.category === category);
      }

      // Filtrar por búsqueda
      if (search.trim() !== "") {
        filtered = filtered.filter(
          (product) =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())
        );
      }

      setProductsFiltered(filtered);
      setIsLoading(false);
    }, 300);
  };

  const handleFilter = (category: string) => {
    setActiveCategory(category);
    applyFilters(category, searchQuery);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    applyFilters(activeCategory, value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    applyFilters(activeCategory, "");
  };

  const handleShowAll = () => {
    setActiveCategory("Todos");
    setSearchQuery("");
    applyFilters("Todos", "");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-green-50 to-white">
      <section className="py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Search Bar  */}
          <SearchBar
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            clearSearch={clearSearch}
          />

          <div className="flex gap-6 relative">
            {/* Sidebar Filter Panel */}
            <SidebaFilterPanel
              showFilterPanel={showFilterPanel}
              setShowFilterPanel={setShowFilterPanel}
              activeCategory={activeCategory}
              handleFilter={handleFilter}
              isLoading={isLoading}
              categories={categories}
              handleShowAll={handleShowAll}
            />

            {/* Overlay for mobile - CORREGIR EL Z-INDEX Y AGREGAR bg-black */}
            {showFilterPanel && (
              <div
                className="fixed inset-0  bg-opacity-50 z-20 lg:hidden"
                onClick={() => setShowFilterPanel(false)}
              />
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Filter Button and Results */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilterPanel(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Filter className="w-4 h-4" />
                    Filtros
                  </button>
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">
                      {productsFiltered.length}
                    </span>{" "}
                    productos encontrados
                  </p>
                </div>
                {(searchQuery || activeCategory !== "Todos") && (
                  <button
                    onClick={handleShowAll}
                    className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                  </button>
                )}
              </div>

              {/* Products Grid or Loading */}
              {isLoading ? (
                <div className="flex flex-col justify-center items-center py-20">
                  <Loader2 className="h-12 w-12 animate-spin text-green-600 mb-4" />
                  <p className="text-gray-600">Cargando productos...</p>
                </div>
              ) : productsFiltered.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {productsFiltered.map((product, index) => (
                    <div
                      key={product.id}
                      className="animate-in fade-in slide-in-from-bottom-4"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animationFillMode: "backwards",
                      }}
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center py-20 text-center">
                  <div className="bg-gray-100 rounded-full p-6 mb-4">
                    <Search className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta con otros términos de búsqueda o categorías
                  </p>
                  <button
                    onClick={handleShowAll}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Ver todos los productos
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
