import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ShoppingCart,
  Leaf,
  CheckCircle,
  Minus,
  Plus,
  Heart,
  Share2,
  Loader2,
} from "lucide-react";
import { useCartActions, useCartStore } from "@/store/cart.store";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/product.store";
import { Product } from "@/types/Product.types";
import { toast } from "sonner";
import { useCustomerStore } from "@/store/customer.store";
import { User } from "@/types/User.types";
import { useAuthStore } from "@/store/auth.store";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProductById, selectedProduct, isLoading } = useProductStore();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartActions();
  const { addItemToBackend } = useCartStore();
  const { user } = useAuthStore();
  useEffect(() => {
    if (id) {
      setImageError(false); // Resetear error de imagen al cambiar de producto
      fetchProductById(Number(id));
    }
  }, [fetchProductById, id]);

  const getRatingColor = (rating: number) => {
    if (rating >= 90)
      return "text-emerald-600 border-emerald-600 bg-emerald-50";
    if (rating >= 70) return "text-yellow-600 border-yellow-600 bg-yellow-50";
    return "text-orange-600 border-orange-600 bg-orange-50";
  };

  const colorStock = (stock: number) => {
    if (stock > 90) return "text-green-600";
    if (stock > 51 && stock <= 90) return "text-orange-600";
    if (stock === 0) return "text-gray-500";
    return "text-red-600";
  };

  const getImpactLevel = (percentage: number) => {
    if (percentage >= 85)
      return { level: "Excelente", color: "text-emerald-600" };
    if (percentage >= 70)
      return { level: "Muy Bueno", color: "text-green-600" };
    if (percentage >= 50) return { level: "Bueno", color: "text-yellow-600" };
    return { level: "Moderado", color: "text-orange-600" };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link to="/store">
            <Button>Volver a la tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  const product = selectedProduct;
  const impactLevel = getImpactLevel(
    product.environmentalData?.recyclablePercentage || 0
  );

  console.log("product", product);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const handleAddToCart = async (
    productId: number,
    quantity: number,
    user: any
  ) => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar al carrito");
      return;
    }
    await addItemToBackend(productId, quantity);
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-emerald-50 to-green-100 shadow-lg flex items-center justify-center">
              {imageError || !product.imageUrl ? (
                <div className="flex flex-col items-center justify-center h-full w-full text-gray-400">
                  <svg
                    className="w-24 h-24 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="text-sm">Imagen no disponible</p>
                </div>
              ) : (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  onLoad={() => setImageError(false)}
                />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {product.categoryName}
                </Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Por{" "}
                <span className="font-medium text-gray-900">
                  {product.brandId}
                </span>
              </p>
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                €{product.price.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  IVA incluido
                </span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium text-gray-500">
                  Disponibilidad:
                </span>
                <span
                  className={`text-sm font-semibold ${colorStock(
                    product.stock
                  )}`}
                >
                  {product.stock > 0
                    ? `${product.stock} unidades`
                    : "Sin Stock"}
                </span>
              </div>
            </div>

            {/* Sustainability Rating */}
            {product.environmentalData && (
              <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200">
                <div className="flex items-center gap-6">
                  <div
                    className={`shrink-0 w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center bg-white ${getRatingColor(
                      product.environmentalData.recyclablePercentage
                    )}`}
                  >
                    <Leaf className="w-5 h-5 text-emerald-600 mb-1" />
                    <div className="text-3xl font-bold leading-none">
                      {product.environmentalData.recyclablePercentage}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">/ 100</div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`text-xl font-bold ${impactLevel.color}`}>
                        {impactLevel.level}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Este producto tiene un impacto ambiental{" "}
                      {impactLevel.level.toLowerCase()} con{" "}
                      {product.environmentalData.recyclablePercentage}% de
                      reciclabilidad.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Certifications */}
            {product.certificationNames &&
              product.certificationNames.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Certificaciones
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.certificationNames.map((cert, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-emerald-200 text-sm bg-emerald-50"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Quantity & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={product.stock === 0}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-semibold border-x-2 border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity(Math.min(product.stock, quantity + 1))
                    }
                    className="p-3 hover:bg-gray-100 transition-colors"
                    disabled={product.stock === 0 || quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product.id, quantity, user)}
                  disabled={product.stock === 0}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors group">
                  <Heart className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                  <span className="text-sm font-medium">Favoritos</span>
                </button>
                <button className="flex-1 border-2 border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors group">
                  <Share2 className="w-5 h-5 group-hover:text-emerald-600 transition-colors" />
                  <span className="text-sm font-medium">Compartir</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        {product.environmentalData && (
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Impacto Ambiental
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Datos ambientales del producto
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Carbon Footprint */}
              <div className="bg-linear-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Huella de Carbono
                  </h4>
                </div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">
                  {product.environmentalData.carbonFootprint} kg CO₂
                </div>
                <p className="text-sm text-gray-600">
                  Emisiones totales en el ciclo de vida del producto
                </p>
              </div>

              {/* Water Usage */}
              <div className="bg-linear-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Consumo de energía
                  </h4>
                </div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {product.environmentalData.energyConsumption} kWh
                </div>
                <p className="text-sm text-gray-600">
                  Energía consumida en el ciclo de vida del producto
                </p>
              </div>

              {/* Recyclable Percentage */}
              <div className="bg-linear-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Reciclabilidad
                  </h4>
                </div>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {product.environmentalData.recyclablePercentage}%
                </div>
                <p className="text-sm text-gray-600">
                  Del producto puede ser reciclado al final de su vida útil
                </p>
              </div>

              {/* Renewable Materials */}
              <div className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                    <Leaf className="w-6 h-6 text-teal-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    Materiales Renovables
                  </h4>
                </div>
                <div className="text-4xl font-bold text-teal-600 mb-2">
                  {product?.environmentalData?.recyclablePercentage}%
                </div>
                <p className="text-sm text-gray-600">
                  Del producto está hecho con materiales renovables
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">📦</span>
              Información de Envío
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Envío gratis en pedidos mayores a €50
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Entrega en 3-5 días hábiles
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Embalaje sostenible y reciclable
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              Garantía y Devoluciones
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                30 días para devoluciones
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Garantía de 2 años
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                Soporte al cliente 24/7
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
