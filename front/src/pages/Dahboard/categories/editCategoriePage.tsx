 import EditBrandForm from "@/components/dashboard/brands/editBrand";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useBrandStore } from "@/store/brand.store";
import { Loader2 } from "lucide-react";
import { useCategoryStore } from "@/store/category.store";
import EditCategorieForm from "@/components/dashboard/categories/editCategorie";

const EditCategorie = () => {
  const { id } = useParams();

  const { currentCategory , fetchCategoryById, isLoading } = useCategoryStore();

  useEffect(() => {
    if (id) {
      fetchCategoryById(Number(id));
    }
  }, [id]);

  if (isLoading) {
    return <div>
      <Loader2 className="animate-spin"/>
      </div>;
  }

  if (!currentCategory) {
    return <div>No se encontró la categoria</div>;
  }

  console.log("currentCategory", currentCategory);

  return (
    <div>
      <EditCategorieForm category={currentCategory!} />
    </div>
  );
};

export default EditCategorie;
