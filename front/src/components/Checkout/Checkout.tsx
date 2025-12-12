import { useEffect, useState } from "react";
import {
  Leaf,
  User,
  MapPin,
  CreditCard,
  Recycle,
  TreePine,
  CheckCircle,
  ArrowLeft,
  Check,
  X,
} from "lucide-react";
import { useCart, useCartStore } from "@/store/cart.store";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "@/types/ShoppingCart.types";
import { useAuthStore } from "@/store/auth.store";
import { useOrderStore } from "@/store/order.store";
import { usePaymentStore } from "@/store/payment.store";
import { useCustomerStore } from "@/store/customer.store";

// Tipo para los detalles de la orden de PayPal
interface PayPalOrderDetails {
  id: string;
  status: string;
  purchase_units: Array<{
    amount: {
      value: string;
    };
  }>;
  payer: {
    email_address: string;
    payer_id?: string;
  };
  backendOrderId?: string | number;
  backendOrderNumber?: string;
}

// Configuración inicial de PayPal
const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

const Checkout = () => {
  const { user } = useAuthStore();
  const {
    createOrder: createOrderInStore,
    confirmOrder,
    cancelOrder,
    selectedOrder,
    error: orderError,
  } = useOrderStore();
  const {
    cart,
    fetchCart,
    isLoading,
    error,
    setCustomerId,
    clearCartInBackend,
    customerId,
  } = useCartStore();
  const { createPayment } = usePaymentStore();

  const { fetchCustomerByEmail, currentCustomer } = useCustomerStore();

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.id) {
      setCustomerId(user.id);
      fetchCart();
    }
  }, [user?.id]);

  console.log("cart ", cart);
  console.log("customerId ", customerId);

  useEffect(() => {
    if (!user) {
      return;
    }
    if (user.id) {
      fetchCustomerByEmail(user.email);
    }
  }, [user?.id]);

  console.log("currentCustomer ", currentCustomer);

  // Helpers: calcular precios cuando backend devuelve null
  const getUnitPrice = (item: any) => {
    return item.unitPrice ?? item.product?.price ?? 0;
  };

  const getItemSubTotal = (item: any) => {
    return item.subTotal ?? getUnitPrice(item) * (item.quantity ?? 0);
  };

  // Forzar cálculo del total sumando los subtotales de los items
  const computedTotal = cart?.items?.length
    ? cart.items.reduce((s: number, it: any) => s + getItemSubTotal(it), 0)
    : 0;

  //estado de pago

  const [selectedPayment, setSelectedPayment] = useState("paypal");
  const [orderDetails, setOrderDetails] = useState<PayPalOrderDetails | null>(
    null
  );
  const [backendOrderId, setBackendOrderId] = useState<string | number | null>(
    null
  );
  const [paymentStatus, setPaymentStatus] = useState<
    "success" | "error" | "cancelled" | null
  >(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Función para parsear la dirección
  const parseShippingAddress = (address: string) => {
    if (!address)
      return { street: "", city: "", state: "", postalCode: "", country: "" };

    // Ejemplo: "123 Main Street, Los Angeles, CA, USA"
    const parts = address.split(",").map((part) => part.trim());

    return {
      street: parts[0] || "",
      city: parts[1] || "",
      state: parts[2] || "",
      country: parts[3] || "",
    };
  };

  // Estados del formulario
  const [formData, setFormData] = useState(() => {
    const addressParts = parseShippingAddress(
      currentCustomer?.shippingAddress || ""
    );

    return {
      firstName: currentCustomer
        ? "firstName" in currentCustomer
          ? currentCustomer.firstName
          : currentCustomer.user?.firstName || ""
        : "",
      lastName: currentCustomer
        ? "lastName" in currentCustomer
          ? currentCustomer.lastName
          : currentCustomer.user?.lastName || ""
        : "",
      email: currentCustomer
        ? "email" in currentCustomer
          ? currentCustomer.email
          : currentCustomer.user?.email || ""
        : "",
      phone: currentCustomer?.phone || "",
      street: addressParts.street,
      city: addressParts.city,
      state: addressParts.state,
      postalCode: currentCustomer?.postalCode || "",
      country: addressParts.country || "Argentina",
    };
  });

  // Cálculos de impacto basados en el carrito real
  const calculateImpact = () => {
    let totalCO2 = 0;
    let totalRecyclable = 0;
    let totalItems = 0;

    cart.items.forEach((item) => {
      if (item.product?.environmentalData) {
        totalCO2 +=
          (item.product.environmentalData.carbonFootprint || 0) * item.quantity;
        totalRecyclable +=
          (item.product.environmentalData.recyclablePercentage || 0) *
          item.quantity;
      }
      totalItems += item.quantity;
    });

    const avgRecyclable =
      totalItems > 0 ? Math.round(totalRecyclable / totalItems) : 0;
    const treesEquivalent = (totalCO2 / 8).toFixed(1);

    return {
      co2Avoided: totalCO2.toFixed(1),
      recyclablePercent: avgRecyclable,
      treesEquivalent,
    };
  };

  const impact = calculateImpact();

  // Estado para preservar el impacto después de limpiar el carrito
  const [finalImpact, setFinalImpact] = useState(impact);

  // Actualizar finalImpact siempre que haya items en el carrito
  // Esto asegura que tengamos el último valor válido antes de que se vacíe
  useEffect(() => {
    if (cart.items.length > 0) {
      setFinalImpact(impact);
    }
  }, [
    cart.items.length,
    impact.co2Avoided,
    impact.recyclablePercent,
    impact.treesEquivalent,
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Crear orden de PayPal con los items del carrito
  const createOrder = (data: Record<string, unknown>, actions: any) => {
    // Validar que el formulario esté completo
    const requiredFields: (keyof typeof formData)[] = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "street",
      "city",
      "state",
      "postalCode",
    ];
    const isFormValid = requiredFields.every(
      (field) => formData[field].trim() !== ""
    );

    if (!isFormValid) {
      alert(
        "Por favor completa todos los campos del formulario antes de continuar con el pago"
      );
      return Promise.reject(new Error("Formulario incompleto"));
    }

    // Crear items para PayPal
    const items = cart.items.map((item) => ({
      name: item.product.name,
      description: item.product.description || "Producto ecológico",
      unit_amount: {
        currency_code: "USD",
        value: item.product.price.toFixed(2),
      },
      quantity: item.quantity.toString(),
    }));

    return actions.order.create({
      purchase_units: [
        {
          description: `Pedido EcoShop - ${cart.items.length} producto(s)`,
          amount: {
            currency_code: "USD",
            value: cart.totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cart.totalPrice.toFixed(2),
              },
            },
          },
          items: items,
          shipping: {
            name: {
              full_name: `${formData.firstName} ${formData.lastName}`,
            },
            address: {
              address_line_1: formData.street,
              admin_area_2: formData.city,
              admin_area_1: formData.state,
              postal_code: formData.postalCode,
              country_code: "AR",
            },
          },
        },
      ],
      application_context: {
        shipping_preference: "SET_PROVIDED_ADDRESS",
      },
    });
  };

  // Aprobar pago - AQUÍ ES DONDE USAMOS LOS ENDPOINTS
  const onApprove = async (data: Record<string, unknown>, actions: any) => {
    setIsProcessing(true);

    try {
      // Validar que el usuario esté autenticado
      if (!user || !user.id) {
        throw new Error("Debes estar autenticado para realizar una compra");
      }

      // Validar que el carrito no esté vacío
      if (cart.items.length === 0) {
        throw new Error("El carrito está vacío");
      }

      // 1. Capturar el pago de PayPal
      const paypalOrder = await actions.order.capture();
      console.log("✅ Pago de PayPal exitoso:", paypalOrder);

      let backendOrderId: number | undefined;
      let backendOrderNumber: string | undefined;

      // 2. Crear la orden en el backend
      if (customerId) {
        console.log("Creando orden en backend para cliente:", customerId);
        const newOrder = await createOrderInStore(customerId);

        if (newOrder) {
          backendOrderId = newOrder.id;
          backendOrderNumber = newOrder.orderNumber;
          console.log("✅ Orden creada en backend:", newOrder);

          // 3. Registrar el pago en el backend
          const paymentData = {
            orderId: newOrder.id,
            amount: parseFloat(
              paypalOrder.purchase_units[0]?.amount?.value || "0"
            ),
            paymentDate: new Date().toISOString(),
          };

          console.log(
            ">> Iniciando registro de pago en backend con datos:",
            paymentData
          );
          const payment = await createPayment(paymentData);

          if (payment) {
            console.log("✅ Pago registrado en backend EXITOSAMENTE:", payment);
          } else {
            console.error(
              "❌ FALTO registrar el pago en backend (createPayment devolvió null)"
            );
            // No bloqueamos el flujo si falla el registro del pago, pero logueamos el error
            // Podríamos considerar mostrar una advertencia o intentar reintentar
          }
        } else {
          throw new Error("No se pudo crear la orden en el backend");
        }
      } else {
        // Fallback si no hay customerId (no debería pasar por el check de user)
        console.warn(
          "No hay customerId, saltando creación de orden en backend"
        );
      }

      // 4. Actualizar estado en el frontend
      setOrderDetails({
        ...paypalOrder,
        backendOrderId: backendOrderId,
        backendOrderNumber: backendOrderNumber,
      });
      setPaymentStatus("success");

      // 5. Limpiar el carrito local
      console.log("🔄 Limpiando carrito local...");
      await clearCartInBackend();
    } catch (error) {
      console.error("❌ Error al procesar la orden:", error);

      // Mostrar el mensaje de error específico al usuario
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al procesar tu orden";

      console.error("Mensaje de error:", errorMessage);
      setPaymentStatus("error");

      // Si hubo error y se creó la orden, intentar cancelarla (opcional, depende de la lógica de negocio)
      // En este caso, si falló createOrderInStore, no hay orden que cancelar.
      // Si falló createPayment, la orden existe pero no tiene pago registrado.

      // Mostrar alerta con el error específico
      alert(
        `Error: ${errorMessage}\n\nPor favor, verifica tu conexión e intenta nuevamente. Si el problema persiste, contacta al soporte.`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Error en el pago
  const onError = (err: any) => {
    console.error("Error en PayPal:", err);
    setPaymentStatus("error");
    setIsProcessing(false);
  };

  // Cancelar pago
  const onCancel = (data: Record<string, unknown>) => {
    console.log("Pago cancelado:", data);
    setPaymentStatus("cancelled");
    setIsProcessing(false);
  };

  // Validar si el carrito está vacío
  if (cart.items.length === 0 && paymentStatus !== "success") {
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

  console.log("orderDetails", orderDetails);
  console.log("impact", impact);

  // Mostrar mensaje de éxito después del pago
  if (paymentStatus === "success") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                ¡Pago Exitoso!
              </h2>
              <p className="text-gray-600 mb-6">
                Tu pedido ha sido procesado correctamente
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold mb-3">Detalles de la Orden</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID de Orden:</span>
                    <span className="font-mono">{orderDetails?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estado:</span>
                    <span className="text-green-600 font-semibold">
                      {orderDetails?.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Pagado:</span>
                    <span className="font-semibold">
                      ${orderDetails?.purchase_units[0]?.amount?.value} USD
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span>{orderDetails?.payer?.email_address}</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-emerald-900 mb-3">
                  Tu Impacto Ambiental
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {finalImpact.co2Avoided} kg
                    </div>
                    <div className="text-xs text-gray-600">CO₂ Evitado</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {finalImpact.recyclablePercent}%
                    </div>
                    <div className="text-xs text-gray-600">Reciclable</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-emerald-700">
                      {finalImpact.treesEquivalent}
                    </div>
                    <div className="text-xs text-gray-600">Árboles</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Link to="/store">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Seguir Comprando
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => window.print()}>
                  Imprimir Recibo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <Link
          to="/cart"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al carrito
        </Link>

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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
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
                    Nombre *
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
                    Apellido *
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
                    Email *
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
                    Teléfono *
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
                    Calle y número *
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
                      Ciudad *
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
                      Provincia/Estado *
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
                      Código Postal *
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
                      País *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      disabled
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
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
                  onClick={() => setSelectedPayment("paypal")}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedPayment === "paypal"
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-3xl mb-2">💙</div>
                  <div className="font-semibold text-gray-900">PayPal</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment("mercadopago")}
                  disabled
                  className="p-6 rounded-xl border-2 border-gray-200 opacity-50 cursor-not-allowed"
                >
                  <div className="text-3xl mb-2">💳</div>
                  <div className="font-semibold text-gray-900">MercadoPago</div>
                  <div className="text-xs text-gray-500 mt-1">Próximamente</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment("stripe")}
                  disabled
                  className="p-6 rounded-xl border-2 border-gray-200 opacity-50 cursor-not-allowed"
                >
                  <div className="text-3xl mb-2">💰</div>
                  <div className="font-semibold text-gray-900">Stripe</div>
                  <div className="text-xs text-gray-500 mt-1">Próximamente</div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-900">
                Resumen del Pedido
              </h2>

              {/* Products List */}
              <div className="border-b pb-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cart.items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <img
                        src={item.product.imageUrl || "/placeholder.jpg"}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-emerald-600">
                          €{getItemSubTotal(item).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Summary */}
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-3 bg-emerald-50 rounded-lg">
                  <Leaf className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                  <div className="text-sm font-bold text-emerald-700">
                    {impact.co2Avoided}kg
                  </div>
                  <div className="text-xs text-gray-600">CO₂</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Recycle className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                  <div className="text-sm font-bold text-blue-700">
                    {impact.recyclablePercent}%
                  </div>
                  <div className="text-xs text-gray-600">Reciclable</div>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg">
                  <TreePine className="w-4 h-4 mx-auto text-amber-600 mb-1" />
                  <div className="text-sm font-bold text-amber-700">
                    {impact.treesEquivalent}
                  </div>
                  <div className="text-xs text-gray-600">Árboles</div>
                </div>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 text-sm border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cart.items.length} productos)
                  </span>
                  <span className="font-semibold">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Envío</span>
                  <span className="font-semibold text-emerald-600">Gratis</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-lg">
                    ${cart.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PayPal Buttons */}
              {selectedPayment === "paypal" && (
                <div className="pt-4 border-t">
                  {paymentStatus === "error" && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <X className="w-4 h-4 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-red-900 text-sm">
                            Error en el Pago
                          </h4>
                          <p className="text-xs text-red-700 mt-1">
                            Hubo un problema. Intenta nuevamente.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentStatus === "cancelled" && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                      <h4 className="font-semibold text-yellow-900 text-sm">
                        Pago Cancelado
                      </h4>
                      <p className="text-xs text-yellow-700 mt-1">
                        Puedes intentar nuevamente cuando quieras.
                      </p>
                    </div>
                  )}

                  <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                      style={{
                        layout: "vertical",
                        color: "gold",
                        shape: "rect",
                        label: "paypal",
                      }}
                      createOrder={createOrder}
                      onApprove={onApprove}
                      onError={onError}
                      onCancel={onCancel}
                    />
                  </PayPalScriptProvider>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    🔒 Pago seguro procesado por PayPal
                  </p>
                </div>
              )}

              {/* Eco Certifications */}
              <div className="pt-4 border-t">
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Carbono Neutral
                  </span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Eco-Packaging
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
