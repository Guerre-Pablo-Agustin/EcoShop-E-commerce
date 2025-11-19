import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
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
} from "lucide-react";
import { ImpactChart } from "@/components/Products/ImpactChart";
import { ImpactMetrics } from "@/components/Products/ImpactMetrics";
import { useCartActions } from "@/store/cart.store";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const getRatingColor = (rating: number) => {
    if (rating >= 90) return "text-emerald-600 border-primary bg-emerald-50";
    if (rating >= 70) return "text-yellow-600 border-yellow-600 bg-yellow-50";
    return "text-orange-600 border-orange-600 bg-orange-50";
  };

  const { addItem } = useCartActions();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link to="/">
            <Button>Volver al inicio</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <button className="flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Volver
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-linear-to-br from-emerald-50 to-green-100 shadow-lg">
              <img
                src={product.image[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-emerald-500 scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <span className="flex items-center">{"⭐".repeat(4)}⭐</span>
                <span>
                  {product.rating}/100 ({product.reviews} reseñas)
                </span>
              </div>
              <div className="text-4xl font-bold text-primary mb-2">
                ${product.price.toFixed(2)}
                <span className="text-sm font-normal text-gray-500 ml-2">
                  IVA incluido
                </span>
              </div>
            </div>

            {/* Sustainability Rating */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-6">
                <div
                  className={`shrink-0 w-24 h-24 rounded-full border-[6px] flex flex-col items-center justify-center bg-white ${getRatingColor(
                    product.rating
                  )}`}
                >
                  <Leaf className="w-4 h-4 text-emerald-600" />
                  <div className="text-3xl font-bold leading-none">
                    {product.rating}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">/ 100</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      Excelente
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Este producto tiene un impacto ambiental muy bajo y cumple
                    con altos estándares de sostenibilidad.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Certifications */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Certificaciones
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-2 text-primary rounded-lg border border-gray-200 text-sm bg-primary/10"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-semibold border-x border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={() => addItem(product, 1)}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Agregar al Carrito
                </button>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="flex-1 border-2 border-gray-300 hover:border-gray-400 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Section */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Materiales</h2>
          <div className="space-y-4">
            {product.materials.map((material, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="font-medium text-gray-900">
                      {material.name}
                    </span>
                    <span className="text-sm text-emerald-600 ml-2">
                      (Sostenible)
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {material.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${material.color} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${material.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Origen</h4>
              <p className="text-sm text-gray-600">{product.origin.text}</p>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Impacto Ambiental
          </h2>
          <p className="text-gray-500 text-sm mb-8">
            Comparado con productos convencionales similares
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Carbon Footprint */}
            <div className="rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-emerald-600"
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
                <h4 className="font-semibold text-gray-900">
                  Huella de Carbono
                </h4>
              </div>
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                -{product.impact.carbonFootprint}%
              </div>
              <p className="text-sm text-gray-600">
                {product.impact.carbonFootprint}% menos emisiones que botellas plásticas
              </p>
            </div>

            {/* Water Usage */}
            <div className="rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-blue-600"
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
                <h4 className="font-semibold text-gray-900">Consumo de Agua</h4>
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                -{product.impact.waterUsage}%
              </div>
              <p className="text-sm text-gray-600">
                {product.impact.waterUsage}% menos agua en producción
              </p>
            </div>

            {/* Sustainable Materials */}
            <div className=" rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">
                  Materiales Sostenibles
                </h4>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">
                {product.impact.transportDistance}
              </div>
              <p className="text-sm text-gray-600">
               Todos los materiales son renovables o reciclados
              </p>
            </div>

            {/* Recyclable */}
            <div className=" rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full  flex items-center justify-center shrink-0">
                  <svg
                    className="w-5 h-5 text-teal-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900">Embalaje</h4>
              </div>
              <div className="text-4xl font-bold text-teal-600 mb-2">
                {product.impact.recyclable}%
              </div>
              <p className="text-sm text-gray-600">
                {product.impact.recyclable}% Embalaje compostable y reciclable
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
