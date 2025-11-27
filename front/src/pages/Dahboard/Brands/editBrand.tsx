import EditBrandForm from "@/components/dashboard/brands/editBrand";
import { brands } from "@/data/products";
import React from "react";
import { useParams } from "react-router-dom";

const EditBrand = () => {
  const { id } = useParams();
  const brand = brands.find((b) => b.id === id);

  if (!brand) {
    return <div>Marca no encontrada</div>;
  }

  return (
    <div>
      <EditBrandForm brand={brand} />
    </div>
  );
};

export default EditBrand;
