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
import { Brand } from "@/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface Props {
  brand: Brand;
}

const formBrandSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  logo: z.string().url({
    message: "Debe ser una URL válida.",
  }),
  description: z.string().min(10, {
    message: "La descripción debe tener al menos 10 caracteres.",
  }),
  website: z.string().url({
    message: "Debe ser una URL válida.",
  }),
  sustentabilityStory: z.string().min(10, {
    message:
      "La historia de sustentabilidad debe tener al menos 10 caracteres.",
  }),
});

const EditBrandForm = ({ brand }: Props) => {
  const form = useForm<z.infer<typeof formBrandSchema>>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: brand,
  });

  const handleSubmit = (values: z.infer<typeof formBrandSchema>) => {
    console.log("Marca actualizada:", values);
    // Aquí iría la lógica para actualizar la marca
  };

  return (
    <Card className="p-6 w-full">
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

            {/* Logo URL */}
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del Logo</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://ejemplo.com/logo.png"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    URL de la imagen del logo de la marca
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
              name="website"
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
              name="sustentabilityStory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Historia de Sustentabilidad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Historia de sustentabilidad de la marca"
                      {...field}
                    />
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
              <Button type="submit">Guardar Cambios</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditBrandForm;
