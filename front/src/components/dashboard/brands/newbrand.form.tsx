import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Leaf,
  Recycle,
  Globe,
  Check,
  Shield,
  Lock,
  Database,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useBrandStore } from "@/store/brand.store";
import { toast } from "sonner";

const formBrandSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "La descripción debe tener al menos 2 caracteres.",
  }),
  websiteUrl: z.string().url({
    message: "Debe ser una URL válida.",
  }),
  country: z.string().min(2, {
    message: "El pais debe tener al menos 2 caracteres.",
  }),
});

export default function RegisterNewBrand() {
  const { createBrand, isLoading, error } = useBrandStore();

  const form = useForm<z.infer<typeof formBrandSchema>>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: {
      name: "",
      description: "",
      websiteUrl: "",
      country: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formBrandSchema>) => {
    try {
      await createBrand(values);
      toast.success("Marca creada exitosamente");
      form.reset();
    } catch (error) {
      toast.error(
        `Error al crear la marca: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold  mb-2">
                Registro de Marca Sostenible
              </h1>
              <p className="">
                Únete a nuestra red de proveedores comprometidos con el medio
                ambiente
              </p>
            </div>

            {/* Icons Section */}
            <div className="flex justify-center gap-6 py-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-3">
                  <Leaf className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-3">
                  <Recycle className="w-10 h-10 text-green-600" />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-full  flex items-center justify-center mb-3">
                  <Globe className="w-10 h-10 text-green-600" />
                </div>
              </div>
            </div>

            <div className="text-center  font-medium">
              Sostenibilidad • Transparencia • Impacto Positivo
            </div>

            {/* Features */}
            <div className="space-y-4 pt-8">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">Certificación Ecológica</h3>
                  <p className="text-sm">Valida tus prácticas sostenibles</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">Red Global</h3>
                  <p className="text-sm">Conecta con compradores conscientes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">Gestión Transparente</h3>
                  <p className="text-sm ">Herramientas para tu crecimiento</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <Card>
            <CardContent>
              <CardHeader>
                <h2 className="text-xl font-semibold  mb-1">Información</h2>
                <p className="text-sm  mb-6">
                  Completa los datos de la marca 
                </p>
              </CardHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Nombre</FormLabel>
                        <FormControl>
                          <Input placeholder="Nombre" {...field} />
                        </FormControl>
                        <FormDescription>Nombre de la marca</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Descripción</FormLabel>
                        <FormControl>
                          <Input placeholder="Descripción" {...field} />
                        </FormControl>
                        <FormDescription>
                          Descripción de la marca
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="websiteUrl"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>URL del sitio web</FormLabel>
                        <FormControl>
                          <Input placeholder="URL del sitio web" {...field} />
                        </FormControl>
                        <FormDescription>
                          URL del sitio web de la marca
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>País</FormLabel>
                        <FormControl>
                          <Input placeholder="País" {...field} />
                        </FormControl>
                        <FormDescription>País de la marca</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base"
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Crear Marca"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
