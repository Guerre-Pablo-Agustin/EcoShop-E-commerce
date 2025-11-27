import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Product } from "@/data/products";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface Props {
  product: Product;
}

const brandSchema = z.object({
  id: z.string(),
  name: z.string().min(1, {
    message: "Por favor selecciona un fabricante.",
  }),
  logo: z.string(),
  description: z.string(),
  website: z.string(),
  sustentabilityStory: z.string(),
});

const formProductSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres.",
  }),
  description: z.string().min(2, {
    message: "La descripción debe tener al menos 2 caracteres.",
  }),
  price: z.number().min(0, {
    message: "El precio debe ser mayor o igual a 0",
  }),
  image: z.array(z.string()).min(1, {
    message: "Por favor selecciona al menos una imagen.",
  }),
  category: z.string().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  impact: z.object({
    carbonFootprint: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
    waterUsage: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
    transportDistance: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
    recyclable: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
  }),
  stock: z.number().min(0, {
    message: "El stock debe ser mayor o igual a 0",
  }),
  brand: brandSchema,
  certifications: z
    .array(z.string())
    .min(1, { message: "Por favor selecciona al menos una certificación." }),
  materials: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Por favor selecciona un material.",
      }),
      percentage: z.number().min(0, {
        message: "Por favor selecciona un porcentaje de materiales.",
      }),
      color: z.string().min(1, {
        message: "Por favor selecciona un color.",
      }),
    })
  ),
  origin: z.object({
    text: z.string().min(1, {
      message: "Por favor selecciona un origen.",
    }),
  }),
  rating: z.number().min(0, {
    message: "Por favor califica la calidad del producto.",
  }),
  isActive: z.boolean(),
});

const EditProductForm = ({ product }: Props) => {
  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
    defaultValues: product,
  });

  const handleSubmit = () => {
    console.log("Form submitted successfully:", form.getValues());
    form.reset();
  };

  return (
    <Card className="p-6 w-full">
      <CardContent>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
        </CardHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Nombre del Producto */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre del producto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ingresa el nombre del producto
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
                    <Input placeholder="Descripción del producto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Describe las características del producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/*precio y marca*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Precio */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Precio del producto en tu moneda local
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Cantidad disponible en inventario
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Categoría */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoría del producto" {...field} />
                  </FormControl>
                  <FormDescription>
                    Categoría a la que pertenece el producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Marca - Nombre */}
            <FormField
              control={form.control}
              name="brand.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre de la marca" {...field} />
                  </FormControl>
                  <FormDescription>
                    Nombre del fabricante o marca
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Origen */}
            <FormField
              control={form.control}
              name="origin.text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Origen</FormLabel>
                  <FormControl>
                    <Input placeholder="País o región de origen" {...field} />
                  </FormControl>
                  <FormDescription>
                    Lugar de procedencia del producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Calificación</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="0.0"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Calificación del producto (0-5)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Impacto Ambiental */}
            <Card className="mt-4" >
                <CardHeader>
                  <CardTitle>Impacto Ambiental</CardTitle>
                </CardHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-2">
              {/* Impacto Ambiental - Huella de Carbono */}
              <FormField
                control={form.control}
                name="impact.carbonFootprint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Huella de Carbono</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Huella de carbono en kg CO2
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Impacto Ambiental - Uso de Agua */}
              <FormField
                control={form.control}
                name="impact.waterUsage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Uso de Agua</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>Consumo de agua en litros</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Impacto Ambiental - Distancia de Transporte */}
              <FormField
                control={form.control}
                name="impact.transportDistance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Distancia de Transporte</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Distancia de transporte en km
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Impacto Ambiental - Porcentaje Reciclable */}
              <FormField
                control={form.control}
                name="impact.recyclable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Porcentaje Reciclable</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="0"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Porcentaje del producto que es reciclable (0-100)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            </Card>

            {/* Estado Activo */}
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Producto Activo</FormLabel>
                    <FormDescription>
                      Marca si el producto está disponible para la venta
                    </FormDescription>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botón de Envío */}
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

export default EditProductForm;
