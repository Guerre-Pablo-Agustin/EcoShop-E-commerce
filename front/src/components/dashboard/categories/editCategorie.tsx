import { useCategoryStore } from "@/store/category.store";
import { Category } from "@/types/Category.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
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
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  iconUrl: z.string().url("Debe ser una URL válida"),
  parentCategoryId: z.number().min(1, "Debe seleccionar una categoría padre"),
  subCategories: z.array(z.string()).min(1, "Debe seleccionar al menos una subcategoría"),
});

interface EditCategorieProps {
  category: Category;
}

const EditCategorieForm = ({ category }: EditCategorieProps) => {
  const { updateCategory, isLoading, categories } = useCategoryStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      description: category.description,
      iconUrl: category.iconUrl,
      parentCategoryId: category.parentCategoryId,
      subCategories: category.subCategories,
    },
  });

 

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await updateCategory({
        ...category,
        name: data.name,
        description: data.description,
        iconUrl: data.iconUrl,
        parentCategoryId: data.parentCategoryId,
        subCategories: data.subCategories,
      });
      toast.success("Categoría actualizada exitosamente");
    } catch (error) {
      toast.error(
        `Error al crear la marca: ${
          error instanceof Error ? error.message : "Error desconocido"
        }`
      );
    }
  };

  return <div>
    <Card>
      <CardHeader>
        <h2>Editar Categoría</h2>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormDescription>
                    El nombre de la categoría debe tener al menos 3 caracteres.
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
                    <Input placeholder="Descripción" {...field} />
                  </FormControl>
                  <FormDescription>
                    La descripción de la categoría debe tener al menos 3 caracteres.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iconUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL del ícono</FormLabel>
                  <FormControl>
                    <Input placeholder="URL del ícono" {...field} />
                  </FormControl>
                  <FormDescription>
                    Debe ser una URL válida.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="parentCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoría padre</FormLabel>
                  <FormControl>
                    <Input placeholder="Categoría padre" {...field} />
                  </FormControl>
                  <FormDescription>
                    Debe seleccionar una categoría padre.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
                {isLoading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    "Actualizar"
                )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  </div>;
};

export default EditCategorieForm;
