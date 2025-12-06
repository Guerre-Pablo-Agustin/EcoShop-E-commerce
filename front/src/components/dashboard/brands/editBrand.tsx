import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Brand } from "@/types/Brand.types";
import { useBrandStore } from "@/store/brand.store";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  brand: Brand;
}

const formBrandSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  websiteUrl: z.string().url({
    message: "Debe ser una URL válida.",
  }),
  country: z.string().min(2, {
    message: "El pais debe tener al menos 2 caracteres.",
  }),
});

const EditBrandForm = ({ brand }: Props) => {
  const { updateBrand, isLoading, error } = useBrandStore();

  const form = useForm<z.infer<typeof formBrandSchema>>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: {
      name: brand.name,
      description: brand.description,
      websiteUrl: brand.websiteUrl,
      country: brand.country,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formBrandSchema>) => {
    try {
      await updateBrand({
        ...brand,
        ...values,
      });
      toast.success("Marca actualizada exitosamente");
    } catch (error) {
      toast.error(
        `Error al crear la marca: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  };

  return (
    <Card className="p-6 w-full bg-sidebar">
      <CardContent>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Editar Marca</h2>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Nombre de la Marca */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de la Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la marca" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre comercial de la marca
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Descripción */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="Descripción de la marca" {...field} />
                  </FormControl>
                  <FormDescription>
                    Breve descripción de la marca
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Sitio Web */}
            <FormField
              control={form.control}
              name="websiteUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sitio Web</FormLabel>
                  <FormControl>
                    <Input placeholder="https://ejemplo.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL del sitio web oficial de la marca
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Historia de Sustentabilidad */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historia de Sustentabilidad</FormLabel>
                  <FormControl>
                    <Input placeholder="Pais" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe el compromiso de la marca con la sustentabilidad
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botones de Acción */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Guardar Cambios"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditBrandForm;
