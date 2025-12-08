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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useCategoryStore } from "@/store/category.store";
import { Loader2 } from "lucide-react";
import { useBrandStore } from "@/store/brand.store";
import { useCertificationStore } from "@/store/certification.store";
import { toast } from "sonner";
import { useProductStore } from "@/store/product.store";

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
  brandId: z.number().min(1, {
    message: "Por favor selecciona una marca.",
  }),
  categoryId: z.number().min(1, {
    message: "Por favor selecciona una categoría.",
  }),
  environmentalData: z.object({
    carbonFootprint: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
    material: z.string().min(1, {
      message: "Por favor ingresa el material",
    }),
    countryOfOrigin: z.string().min(1, {
      message: "Por favor ingresa el país de origen",
    }),
    energyConsumption: z.number().min(0, {
      message: "El valor debe ser mayor o igual a 0",
    }),
    recyclablePercentage: z.number().min(0).max(100, {
      message: "El valor debe estar entre 0 y 100",
    }),
    notes: z.string().optional(),
  }),
  certificationIds: z
    .array(z.number())
    .min(1, { message: "Por favor selecciona al menos una certificación." }),
});

const NuevoProducto = () => {


  const { createProduct } = useProductStore();


  const form = useForm<z.infer<typeof formProductSchema>>({
    resolver: zodResolver(formProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      stock: 0,
      brandId: 0,
      categoryId: 0,
      environmentalData: {
        carbonFootprint: 0,
        material: "",
        countryOfOrigin: "",
        energyConsumption: 0,
        recyclablePercentage: 0,
        notes: "",
      },
      certificationIds: [],
    },
  });

  const handleSubmit = async (values: z.infer<typeof formProductSchema>) => {
    try {
      await createProduct(values);
      toast.success("Producto creado exitosamente");
    } catch (error) {
      toast.error("Error al crear el producto");
    }
  };

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
    <Card className="p-6 w-full">
      <CardContent>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Registrar Nuevo Producto</h2>
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

            {/* Imágenes */}
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
                    Agrega la url de la imagen del producto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Precio y Stock */}
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

            {/* Certificaciones */}
            <FormField
              control={form.control}
              name="certificationIds"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Certificaciones</FormLabel>
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

            {/* Datos Ambientales */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Datos Ambientales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="environmentalData.carbonFootprint"
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
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Huella de carbono en kg CO₂
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="environmentalData.energyConsumption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consumo de Energía</FormLabel>
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
                          Consumo de energía en kWh
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="environmentalData.recyclablePercentage"
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
                              field.onChange(parseFloat(e.target.value) || 0)
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Porcentaje reciclable (0-100)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="environmentalData.material"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Material</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ej: Algodón orgánico"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Material principal del producto
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="environmentalData.countryOfOrigin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>País de Origen</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="País o región de origen"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Lugar de procedencia del producto
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="environmentalData.notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas Adicionales</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Información adicional (opcional)"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Cualquier información ambiental adicional
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Botones */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
                Cancelar
              </Button>
              <Button type="submit">Crear Producto</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NuevoProducto;
