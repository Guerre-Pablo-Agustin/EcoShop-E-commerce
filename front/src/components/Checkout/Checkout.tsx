import { useState } from "react";
import {
  Leaf,
  User,
  MapPin,
  CreditCard,
  Recycle,
  TreePine,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { useCart } from "@/store/cart.store";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Checkout = () => {
  const cart = useCart();
  const [selectedPayment, setSelectedPayment] = useState("mercadopago");

  // Estados del formulario
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Argentina",
  });

  // Cálculos de impacto basados en el carrito real
  const calculateImpact = () => {
    let totalCO2 = 0;
    let totalRecyclable = 0;
    let totalItems = 0;

    cart.items.forEach((item) => {
      totalCO2 += item.product.impact.carbonFootprint * item.quantity;
      totalRecyclable += item.product.impact.recyclable * item.quantity;
      totalItems += item.quantity;
    });

    const avgRecyclable =
      totalItems > 0 ? Math.round(totalRecyclable / totalItems) : 0;
    const treesEquivalent = (totalCO2 / 8).toFixed(1); // 1 árbol absorbe ~8kg CO2/año

    return {
      co2Avoided: totalCO2.toFixed(1),
      recyclablePercent: avgRecyclable,
      treesEquivalent,
    };
  };

  const impact = calculateImpact();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementarías la lógica de checkout
    console.log("Datos del pedido:", {
      formData,
      paymentMethod: selectedPayment,
      cart,
      impact,
    });
    // Redirigir a confirmación o procesar el pago
  };

  // Validar si el carrito está vacío
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-6">
            Agrega productos para continuar con el checkout
          </p>
          <Link to="/">
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              Ir a la tienda
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <Link
          to="/cart"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al carrito
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Leaf className="w-8 h-8 text-emerald-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              Checkout Sostenible
            </h1>
          </div>
          <p className="text-gray-600">
            Cada compra hace la diferencia para el planeta
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Información Personal
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Juan"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Apellido
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Pérez"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="juan@ejemplo.com"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+54 11 1234 5678"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Dirección de Envío
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Calle y número
                    </label>
                    <input
                      type="text"
                      name="street"
                      value={formData.street}
                      onChange={handleInputChange}
                      placeholder="Av. Corrientes 1234"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Buenos Aires"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia/Estado
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="CABA"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="C1043"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        País
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Argentina"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                  <h2 className="text-xl font-bold text-gray-900">
                    Método de Pago
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setSelectedPayment("mercadopago")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPayment === "mercadopago"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-semibold text-gray-900">
                      MercadoPago
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment("stripe")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPayment === "stripe"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">💰</div>
                    <div className="font-semibold text-gray-900">Stripe</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedPayment("tarjeta")}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      selectedPayment === "tarjeta"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-3xl mb-2">💳</div>
                    <div className="font-semibold text-gray-900">Tarjeta</div>
                  </button>
                </div>
              </div>

              {/* Footer Message */}
              <div className="text-center text-sm text-gray-500 pt-4">
                Compra segura · Envío eco-friendly · Carbono neutral
              </div>
            </div>

            {/* Sidebar - Impact Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Tu Impacto Positivo
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* CO2 Avoided */}
                  <div className="border border-primary-200 rounded-xl p-4 text-center flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full  flex items-center justify-center mb-3">
                      <Leaf className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-xl font-bold text-emerald-700 mb-1">
                      {impact.co2Avoided} kg
                    </div>
                    <div className="text-sm text-gray-600">CO₂ Evitado</div>
                  </div>

                  {/* Recyclable Material */}
                  <div className="border border-blue-200 rounded-xl p-4 text-center flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center mb-3">
                      <Recycle className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div className="text-xl font-bold text-blue-700 mb-1">
                      {impact.recyclablePercent}%
                    </div>
                    <div className="text-sm text-gray-600">
                      Material Reciclado
                    </div>
                  </div>

                  {/* Trees Equivalent */}
                  <div className="border border-amber-200 rounded-xl p-4 text-center flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full  flex items-center justify-center mb-3">
                      <TreePine className="w-5 h-5 text-amber-700" />
                    </div>
                    <div className="text-xl font-bold text-amber-700 mb-1">
                      {impact.treesEquivalent}
                    </div>
                    <div className="text-sm text-gray-600">
                      Árboles Equivalentes
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Resumen del Pedido
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({cart.items.length} productos)
                      </span>
                      <span className="font-semibold">
                        ${cart.total.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío</span>
                      <span className="font-semibold text-emerald-600">
                        Gratis
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">
                        ${cart.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Eco Certifications */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Eco-Certificaciones
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Carbono Neutral
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Packaging Sostenible
                    </span>
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Producción Ética
                    </span>
                  </div>
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors shadow-lg shadow-emerald-600/30"
                >
                  Confirmar Pedido
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
