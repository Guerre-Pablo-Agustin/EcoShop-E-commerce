import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCartStore, useCartActions } from "@/store/cart.store";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Leaf } from "lucide-react";
import { routes } from "@/lib/routes";

const ShoppingCart = () => {
  const cart = useCartStore((state) => state.cart);
  const { updateQuantity, removeItem, clearCart } = useCartActions();

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-muted mb-4">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Tu carrito está vacío</h1>
          <p className="text-muted-foreground text-lg">
            Explora nuestros productos sostenibles y comienza a llenar tu carrito
          </p>
          <Link to="/">
            <Button size="lg" className="mt-4">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Explorar Productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-bold">Tu carrito</h1>
          <Link to="/">
            <Button variant="outline">Seguir comprando</Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Tabla de productos */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                {/* Versión Desktop - Tabla */}
                <div className="hidden md:block">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50%]">PRODUCTO</TableHead>
                        <TableHead className="text-center">CANTIDAD</TableHead>
                        <TableHead className="text-right">PRECIO</TableHead>
                        <TableHead className="text-right">TOTAL</TableHead>
                        <TableHead className="text-center"> </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.items.map((item) => (
                        <TableRow key={item.id}>
                          {/* Producto */}
                          <TableCell>
                            <div className="flex gap-4">
                              <Link to={`/product/${item.product.id}`}>
                                <img
                                  src={item.product.image[0]}
                                  alt={item.product.name}
                                  className="w-20 h-20 object-cover rounded-lg"
                                />
                              </Link>
                              <div className="flex flex-col justify-center">
                                <Link
                                  to={`/product/${item.product.id}`}
                                  className="font-semibold hover:text-primary transition-colors"
                                >
                                  {item.product.name}
                                </Link>
                                <p className="text-sm text-muted-foreground">
                                  {item.product.category}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                  <Leaf className="h-3 w-3 text-primary" />
                                  <span>{item.itemCarbonFootprint.toFixed(2)} kg CO₂</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>

                          {/* Cantidad */}
                          <TableCell>
                            <div className="flex items-center justify-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>

                          {/* Precio */}
                          <TableCell className="text-right font-medium">
                            €{item.unitPrice.toFixed(2)}
                          </TableCell>

                          {/* Total */}
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-3">
                              <span className="font-bold">
                                €{item.subTotal.toFixed(2)}
                              </span>
                            </div>
                          </TableCell>

                          {/* Botón de borrar */}
                          <TableCell className="text-center">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Versión Mobile - Cards */}
                <div className="md:hidden divide-y">
                  {cart.items.map((item) => (
                    <div key={item.id} className="p-4 space-y-3">
                      <div className="flex gap-3">
                        <Link to={`/product/${item.product.id}`}>
                          <img
                            src={item.product.image[0]}
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="font-semibold hover:text-primary line-clamp-2"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            {item.product.category}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <Leaf className="h-3 w-3 text-primary" />
                            <span>{item.itemCarbonFootprint.toFixed(2)} kg CO₂</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">
                              €{item.unitPrice.toFixed(2)}
                            </p>
                            <p className="font-bold">€{item.subTotal.toFixed(2)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Botón vaciar carrito */}
            <div className="flex justify-end mt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Vaciar carrito
              </Button>
            </div>
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-bold">Resumen del pedido</h2>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Productos ({cart.items.length})
                    </span>
                    <span className="font-medium">€{cart.total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envío</span>
                    <span className="font-medium text-primary">Gratis</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">€{cart.total.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                {/* Impacto ambiental */}
                <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-primary">
                    <Leaf className="h-4 w-4" />
                    <span className="text-sm">Impacto Ambiental</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Huella de carbono estimada
                      </span>
                      <span className="font-medium">
                        {cart.estimatedCarbonFootprint.toFixed(2)} kg CO₂
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {cart.estimatedCarbonFootprint < 10
                        ? "¡Excelente elección! Bajo impacto ambiental"
                        : cart.estimatedCarbonFootprint < 20
                        ? "Impacto ambiental moderado"
                        : "Considera productos con menor huella de carbono"}
                    </p>
                  </div>
                </div>

              <Link to={routes.checkout}>
                <Button className="w-full" size="lg">
                  Proceder al pago
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              

                <div className="space-y-2 text-xs text-muted-foreground text-center pt-2">
                  <p>🔒 Pago 100% seguro</p>
                  <p>📦 Envío gratuito en pedidos superiores a €50</p>
                  <p>↩️ Devoluciones gratuitas en 30 días</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;