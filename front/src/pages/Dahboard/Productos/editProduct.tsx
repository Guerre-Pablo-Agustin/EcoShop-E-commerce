import EditProductForm from "@/components/dashboard/product/editProduct";
import { products } from "@/data/products";
import React from "react";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  return <div>
    <EditProductForm product={product!} />
  </div>;
};

export default EditProduct;
