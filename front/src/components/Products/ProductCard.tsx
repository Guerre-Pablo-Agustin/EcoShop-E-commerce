import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";
import { useCartActions } from "@/store/cart.store";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const { addItem } = useCartActions();


  return (
    <Card className="group overflow-hidden transition-all hover:shadow-xl border border-gray-200 rounded-2xl bg-white p-0">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.image[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Heart Icon */}
          <button 
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10"
            onClick={(e) => {
              e.preventDefault();
              // Agregar a favoritos
            }}
          >
            <Heart className="h-5 w-5 text-gray-600" />
          </button>

          {/* Badges en la parte inferior */}
          <div className="absolute bottom-3 left-3 flex gap-2">
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-sm flex items-center gap-1">
              <Leaf className="h-3 w-3 text-green-600" />
              <span className="text-xs font-medium">Hemp</span>
            </Badge>
            <Badge className="bg-white/90 backdrop-blur-sm text-gray-800 border-0 shadow-sm">
              <span className="text-xs font-medium">Comercio justo</span>
            </Badge>
          </div>
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
            {product.category}
          </p>
          <h3 className="font-bold text-base mb-3 line-clamp-2 text-gray-900 group-hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Badge de Impacto */}
        <div className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-3">
          <Leaf className="h-3 w-3" />
          Impacto Alto
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900">
          €{product.price.toFixed(2)}
        </span>
        <Button 
         onClick={() => addItem(product, 1)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 font-medium transition-colors flex items-center gap-2"
          size="sm"
        >
          <ShoppingBag className="h-4 w-4" />
          Añadir
        </Button>
      </CardFooter>
    </Card>
  );
};