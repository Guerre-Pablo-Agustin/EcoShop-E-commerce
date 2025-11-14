import { useParams, Link } from "react-router-dom";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Leaf } from "lucide-react";
import { ImpactChart } from "@/components/Products/ImpactChart";
import { ImpactMetrics } from "@/components/Products/ImpactMetrics";
import { useCartActions } from "@/store/cart.store";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);


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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10">
        <div className="container mx-auto px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>
          </Link>
        </div>
      </header>

      <main className=" mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">
                  €{product.price.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 cursor-pointer" onClick={() => addItem(product, 1)}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al Carrito
              </Button>
            </div>

            <div className="bg-accent/20 border border-accent/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Leaf className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">Compra Sostenible</h3>
                  <p className="text-sm text-muted-foreground">
                    Este producto ha sido cuidadosamente seleccionado por su bajo impacto
                    ambiental y prácticas de producción responsables.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ImpactChart product={product} />
          </div>
          <div>
            <ImpactMetrics product={product} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
