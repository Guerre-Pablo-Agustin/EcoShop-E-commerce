import EditProductForm from "@/components/dashboard/product/editProduct";
import { useProductStore } from "@/store/product.store";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

const EditProduct = () => {
  const { id } = useParams();
  const { fetchProductById, selectedProduct, isLoading, error } =
    useProductStore();

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id));
    }
  }, [fetchProductById, id]);

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
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <Link to={routes.dashboardProducts}>
            <Button>Volver a productos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <EditProductForm product={selectedProduct} />
    </div>
  );
};

export default EditProduct;
