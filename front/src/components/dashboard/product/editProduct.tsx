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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCategoryStore } from "@/store/category.store";
import { Loader2 } from "lucide-react";
import { useBrandStore } from "@/store/brand.store";
import { useCertificationStore } from "@/store/certification.store";
import { Product } from "@/types/Product.types";
import { useProductStore } from "@/store/product.store";
import { toast } from "sonner";

interface Props {
  product: Product;
}

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
  imageUrl: z.string().min(1, {
    message: "Agrega la url de la imagen",
  }),
  stock: z.number().min(0, {
    message: "El stock debe ser mayor o igual a 0",
  }),
  isActive: z.boolean(),
  brandId: z.number().min(1, {
    message: "Por favor selecciona una marca.",
  }),
  categoryId: z.number().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  certificationIds: z
    .array(z.number())
    .min(1, { message: "Por favor selecciona al menos una certificación." }),
  // Environmental Data
  carbonFootprint: z.number().min(0, {
    message: "La huella de carbono debe ser mayor o igual a 0",
  }),
  material: z.string().min(2, {
    message: "El material debe tener al menos 2 caracteres.",
  }),
  countryOfOrigin: z.string().min(2, {
    message: "El país de origen debe tener al menos 2 caracteres.",
  }),
  energyConsumption: z.number().min(0, {
    message: "El consumo energético debe ser mayor o igual a 0",
  }),
  recyclablePercentage: z.number().min(0).max(100, {
    message: "El porcentaje reciclable debe estar entre 0 y 100",
  }),
  environmentalNotes: z.string().optional(),
});

const EditProductForm = ({ product }: Props) => {
  console.log("Producto:", product);

  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl || "",
      stock: product.stock,
      isActive: product.isActive,
      brandId: product.brandId || 0,
      categoryId: product.categoryId || 0,
      certificationIds: product.certificationIds || [],
      // Environmental Data defaults
      carbonFootprint: product.environmentalData?.carbonFootprint || 0,
      material: product.environmentalData?.material || "",
      countryOfOrigin: product.environmentalData?.countryOfOrigin || "",
      energyConsumption: product.environmentalData?.energyConsumption || 0,
      recyclablePercentage:
        product.environmentalData?.recyclablePercentage || 0,
      environmentalNotes: product.environmentalData?.notes || "",
    },
  });

  const { updateProduct } = useProductStore();
  const {
    fetchCategories,
    categories,
    isLoading: loadingCategories,
  } = useCategoryStore();
  const { fetchBrands, brands, isLoading: loadingBrands } = useBrandStore();
  const {
    fetchCertifications,
    certifications,
    isLoading: loadingCerts,
  } = useCertificationStore();

  const handleSubmit = async (values: z.infer<typeof formProductSchema>) => {
    console.log("Valores del formulario:", values);

    try {
      // Crear el objeto con los IDs para la API
      const productData = {
        name: values.name,
        description: values.description,
        price: values.price,
        imageUrl: values.imageUrl,
        stock: values.stock,
        brandId: values.brandId,
        categoryId: values.categoryId,
        certificationIds: values.certificationIds,
        environmentalData: {
          carbonFootprint: values.carbonFootprint,
          material: values.material,
          countryOfOrigin: values.countryOfOrigin,
          energyConsumption: values.energyConsumption,
          recyclablePercentage: values.recyclablePercentage,
          notes: values.environmentalNotes || undefined,
        },
      };

      console.log("Datos a enviar a la API:", productData);
      await updateProduct(product.id, productData);
      toast.success("Producto actualizado exitosamente");
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error al actualizar el producto");
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchCertifications();
  }, [fetchCategories, fetchBrands, fetchCertifications]);

  if (loadingCategories || loadingBrands || loadingCerts) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <Card className="p-6 w-full max-w-5xl mx-auto">
      <CardContent>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Editar Producto</h2>
        </CardHeader>

        <Form {...form}>
          <div className="space-y-8">

            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Información Básica
              </h3>

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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descripción del producto"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe las características del producto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imagen</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="URL de la imagen"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      URL de la imagen del producto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Precio y Stock */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Inventario y Precio
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
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
                            field.onChange(parseInt(e.target.value) || 0)
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
            </div>
            {/* Categoría y Marca */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value > 0 ? field.value.toString() : ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                              className="bg-background text-foreground"
                            >
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>
                      Categoría a la que pertenece el producto
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brandId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marca</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        value={field.value > 0 ? field.value.toString() : ""}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona una marca" />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          {brands.map((brand) => (
                            <SelectItem
                              key={brand.id}
                              value={brand.id.toString()}
                              className="bg-background text-foreground"
                            >
                              {brand.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription>Marca del producto</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Datos Ambientales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">
                Datos Ambientales
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="carbonFootprint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Huella de Carbono (kg CO₂)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Emisiones de CO₂ en kilogramos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="energyConsumption"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consumo Energético (kWh)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        Consumo energético en kilovatios-hora
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="material"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Material Principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Algodón orgánico" {...field} />
                      </FormControl>
                      <FormDescription>
                        Material principal del producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="countryOfOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País de Origen</FormLabel>
                      <FormControl>
                        <Input placeholder="Ej: Argentina" {...field} />
                      </FormControl>
                      <FormDescription>
                        País donde se fabricó el producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recyclablePercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Porcentaje Reciclable (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          placeholder="0"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value) || 0)
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

              <FormField
                control={form.control}
                name="environmentalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas Ambientales (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Información adicional sobre el impacto ambiental..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Información adicional sobre sostenibilidad
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Certificaciones */}
            <div className="space-y-4">
              {/* Certificaciones */}
              <FormField
                control={form.control}
                name="certificationIds"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Certificaciones
                      </FormLabel>
                      <FormDescription>
                        Selecciona todas las certificaciones que apliquen
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {certifications.map((certification) => (
                        <FormField
                          key={certification.id}
                          control={form.control}
                          name="certificationIds"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={certification.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(
                                      certification.id
                                    )}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...field.value,
                                            certification.id,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) =>
                                                value !== certification.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {certification.name}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            {/* Botones */}
            <div className="flex justify-end gap-4 pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => window.history.back()}
              >
                Cancelar
              </Button>
              <Button type="button" onClick={form.handleSubmit(handleSubmit)}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
};

export default EditProductForm;
