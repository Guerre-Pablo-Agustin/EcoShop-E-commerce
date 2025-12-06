import EditCertificationForm from "@/components/dashboard/certifications/editCertification";
import { useCertificationStore } from "@/store/certification.store";
import { Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditCertificationPage = () => {
  const { id } = useParams();

  const { currentCertification, fetchCertificationById, isLoading } =
    useCertificationStore();

  useEffect(() => {
    if (id) {
      fetchCertificationById(Number(id));
    }
  }, [id]);

   if (isLoading) {
      return <div>
        <Loader2 className="animate-spin"/>
        </div>;
    }
  
    if (!currentCertification) {
      return <div>No se encontró la certificacion</div>;
    }

  console.log("currentCertification", currentCertification);

  return (
    <div>
      <EditCertificationForm certification={currentCertification!} />
    </div>
  );
};

export default EditCertificationPage;
