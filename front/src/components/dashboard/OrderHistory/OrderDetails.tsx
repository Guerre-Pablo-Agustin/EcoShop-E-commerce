"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Order } from "@/types/Order.types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Leaf,
  Package,
  Truck,
  CreditCard,
  Calendar,
  ShoppingBag,
} from "lucide-react";

interface OrderDetailsProps {
  order: Order;
  children?: React.ReactNode;
}

export function OrderDetails({ order, children }: OrderDetailsProps) {
  // Función helper para formatear fechas de manera segura
  const formatDate = (date: Date | string) => {
    try {
      return format(new Date(date), "PPP", { locale: es });
    } catch (e) {
      return "Fecha inválida";
    }
  };

  // Helper para el color del estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "PROCESSING":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "CANCELLED":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-6 pb-2 border-b">
          <div className="flex items-center justify-between mr-8">
            <div className="flex items-center gap-4">
              <DialogTitle className="text-2xl font-bold">
                Orden {order.orderNumber}
              </DialogTitle>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
            <div className="text-sm text-gray-500 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(order.orderDate)}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {/* Environmental Impact Section */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-emerald-50 border-emerald-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <Leaf className="w-8 h-8 text-emerald-600 mb-2" />
                  <div className="text-2xl font-bold text-emerald-700">
                    {order.co2Saved.toFixed(2)}kg
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">
                    CO2 Ahorrado
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-emerald-50 border-emerald-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl mb-2">🌱</div>
                  <div className="text-2xl font-bold text-emerald-700">
                    {order.ecoPointsEarned}
                  </div>
                  <div className="text-xs text-emerald-600 font-medium">
                    Puntos Eco Ganados
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-50 border-slate-100">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                  <div className="text-3xl mb-2">👣</div>
                  <div className="text-2xl font-bold text-slate-700">
                    {order.totalCarbonFootprint.toFixed(2)}kg
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Huella de Carbono
                  </div>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Items Section */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <ShoppingBag className="w-5 h-5 text-gray-500" />
                Productos
              </h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-start border rounded-lg p-4 "
                  >
                    <div className="flex gap-4">
                      {/* Aquí podrías agregar la imagen si estuviera disponible en item.product
                      {item.product.imageUrl && (
                        <img
                          src={item.product.imageUrl[0] || "/placeholder.jpg"}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                      )} */}
                      <div>
                        <h4 className="font-medium">
                          {item.product?.name || item.productName}
                        </h4>
                        <p className="text-sm ">
                          Cantidad: {item.quantity} x $
                          {item.unitPrice.toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs border-emerald-200 text-emerald-700 bg-emerald-50"
                          >
                            Huella:{" "}
                            {item.itemCarbonFootprint || item.carbonFootprint}kg
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="font-semibold ">
                      ${(item.subtotal || item.totalPrice || 0).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <div className="w-48 space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Shipping and Payment Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-gray-500" />
                  Envío
                </h3>
                <Card>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div>
                      <span className="font-medium block text-gray-700">
                        Dirección:
                      </span>
                      <span className="text-gray-600">
                        {typeof order.shippingAddress === "object"
                          ? `${(order.shippingAddress as any).street} ${
                              (order.shippingAddress as any).number
                            }, ${(order.shippingAddress as any).city}, ${
                              (order.shippingAddress as any).state
                            }, ${(order.shippingAddress as any).country}`
                          : String(order.shippingAddress)}
                      </span>
                    </div>
                    {order.shippingDate && (
                      <div>
                        <span className="font-medium block text-gray-700">
                          Enviado el:
                        </span>
                        <span className="text-gray-600">
                          {formatDate(order.shippingDate)}
                        </span>
                      </div>
                    )}
                    {order.deliveryDate && (
                      <div>
                        <span className="font-medium block text-gray-700">
                          Entregado el:
                        </span>
                        <span className="text-gray-600">
                          {formatDate(order.deliveryDate)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold flex items-center gap-2 mb-3">
                  <CreditCard className="w-5 h-5 text-gray-500" />
                  Pago
                </h3>
                <Card>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <div>
                      <span className="font-medium block text-gray-700">
                        Método:
                      </span>
                      <span className="text-gray-600 capitalize">
                        {order.payment?.paymentMethod?.toLowerCase() || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium block text-gray-700">
                        Estado:
                      </span>
                      <Badge
                        variant={
                          order.payment?.status === "COMPLETED"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {order.payment?.status || "PENDING"}
                      </Badge>
                    </div>
                    {order.payment?.paymentDate && (
                      <div>
                        <span className="font-medium block text-gray-700">
                          Fecha de pago:
                        </span>
                        <span className="text-gray-600">
                          {formatDate(order.payment.paymentDate)}
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
