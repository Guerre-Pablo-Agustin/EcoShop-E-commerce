import EditBrandForm from "@/components/dashboard/brands/editBrand";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBrandStore } from "@/store/brand.store";
import { Loader2 } from "lucide-react";

const EditBrand = () => {
  const { id } = useParams();

  const { currentBrand, fetchBrandById, isLoading } = useBrandStore();

  useEffect(() => {
    if (id) {
      fetchBrandById(Number(id));
    }
  }, [id]);

  if (isLoading) {
    return <div>
      <Loader2 className="animate-spin"/>
      </div>;
  }

  if (!currentBrand) {
    return <div>No se encontró la marca</div>;
  }

  return (
    <div>
      <EditBrandForm brand={currentBrand!} />
    </div>
  );
};

export default EditBrand;
