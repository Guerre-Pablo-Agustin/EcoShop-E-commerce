import { useCategoryStore } from "@/store/category.store";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  iconUrl: z.string().url("Debe ser una URL válida"),
  parentCategoryId: z.number().min(1, "Debe seleccionar una categoría padre")
});

const NewCategoryForm = () => {
  const { createCategory, isLoading, categories } = useCategoryStore();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      iconUrl: "",
      parentCategoryId: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await createCategory(data);
      toast.success("Categoría creada exitosamente");
    } catch (error) {
      toast.error("Error al crear la categoría");
    }
  };

  return (
    <div>
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
                      El nombre de la categoría debe tener al menos 3
                      caracteres.
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
                      La descripción de la categoría debe tener al menos 3
                      caracteres.
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
                    <FormDescription>Debe ser una URL válida.</FormDescription>
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
                    <Select
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría padre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Debe seleccionar una categoría padre.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Crear"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewCategoryForm;
