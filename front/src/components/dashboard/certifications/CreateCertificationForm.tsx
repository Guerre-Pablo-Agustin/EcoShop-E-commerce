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
import { useCertificationStore } from "@/store/certification.store";

const formSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  description: z
    .string()
    .min(3, "La descripción debe tener al menos 3 caracteres"),
  certificationUrl: z.string().url("Debe ser una URL válida"),
  organization: z.string().min(3, "La organización debe tener al menos 3 caracteres"),
});

const CreateCertificationForm = () => {

    const {createCertification, isLoading} = useCertificationStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      certificationUrl: "",
      organization: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    console.log("values",values)

    try {
      await createCertification(values)
      toast.success("Certificación creada exitosamente")
    } catch (error) {
      toast.error("Error al crear la certificación")
    }
  }

  return (
    <div>
        <Card>
            <CardHeader>
                <h2 className="text-2xl font-bold">Crear certificación</h2>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" {...field} />
                                    </FormControl>
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="certificationUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL de la certificación</FormLabel>
                                    <FormControl>
                                        <Input placeholder="URL de la certificación" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="organization"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Organización</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Organización" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Crear certificación
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default CreateCertificationForm