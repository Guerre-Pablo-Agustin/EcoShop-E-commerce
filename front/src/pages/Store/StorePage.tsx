import Store from "@/components/store/Store";
import { Recycle } from "lucide-react";
import React from "react";
import heroImage from "../../assets/hero-eco.jpg";

const StorePage = () => {
  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-background/50 via-background/70 to-background/50" />
        </div>
        <div className="relative z-10 mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Recycle className="w-4 h-4" />
            Productos 100% Sostenibles
          </div>
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Tienda <span className="text-green-600">Ecológica</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cada producto incluye métricas detalladas de impacto ambiental para
            que puedas tomar decisiones informadas
          </p>
        </div>
      </section>
      <Store />
    </>
  );
};

export default StorePage;
