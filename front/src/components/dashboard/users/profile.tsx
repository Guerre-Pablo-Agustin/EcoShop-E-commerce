import { CustomerbyEmail } from "@/api/customer.api";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z, { set } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCustomerStore } from "@/store/customer.store";
import { useAuthStore } from "@/store/auth.store";
import { toast } from "sonner";

const ProfileFormSchema = z.object({
  firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
  shippingAddress: z
    .string()
    .min(10, "La dirección debe tener al menos 10 caracteres"),
  billingAddress: z
    .string()
    .min(10, "La dirección de facturación debe tener al menos 10 caracteres"),
  carbonFootprint: z
    .number()
    .min(0, "El carbon footprint debe ser mayor o igual a 0"),
  phone: z.string().optional(),
  email: z.string().email("Correo electrónico inválido").optional(),
});

interface ProfileProps {
  customer: CustomerbyEmail | null;
}

const Profile = ({ customer }: ProfileProps) => {
  console.log("Customer in Profile component:", customer);
  const [mensaje, setMensaje] = React.useState<string>("");
  const { updateCustomer, checkEmailExists, clearError } = useCustomerStore();
  const { updateUser } = useAuthStore();

  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      firstName: customer?.firstName,
      lastName: customer?.lastName,
      shippingAddress: customer?.shippingAddress,
      carbonFootprint: customer?.carbonFootprint,
      phone: customer?.phone,
      billingAddress: customer?.billingAddress,
      email: customer?.email,
    },
  });

  // Estados para verificación de email
  const [email, setEmail] = useState(customer?.email || "");
  const [originalEmail] = useState(customer?.email || ""); // Guardar email original
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Funcion para verificar si el email existe (automatica)
  const handleVerifyEmail = async (emailToVerify: string) => {
    // Validacion basica de formato
    if (!emailToVerify || !emailToVerify.includes("@")) {
      setEmailVerified(null);
      setEmailError(null);
      return;
    }

    setIsCheckingEmail(true);
    setEmailVerified(null);
    setEmailError(null);

    try {
      console.log("Iniciando verificacion de email:", emailToVerify);
      const exists = await checkEmailExists(emailToVerify);
      console.log("Resultado de verificacion - Email existe:", exists);

      setEmailVerified(!exists); // true si esta disponible, false si ya existe
      setEmailError(null);
    } catch (error: any) {
      console.error("Error al verificar email:", error);

      // Manejo especÃ­fico de errores
      let errorMessage =
        "Error al verificar el email. Por favor intenta nuevamente.";

      if (error?.message) {
        errorMessage = error.message;
      } else if (error?.response?.status === 400) {
        errorMessage =
          "El formato del email no es valido o no es aceptado por el servidor.";
      } else if (error?.response?.status === 500) {
        errorMessage = "Error en el servidor. Por favor intenta mas tarde.";
      }

      setEmailError(errorMessage);
      setEmailVerified(null);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  // Resetear verificaciÃ³n cuando cambia el email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailVerified(null);
    setEmailError(null);
  };

  // Verificar automÃ¡ticamente cuando el usuario sale del campo
  const handleEmailBlur = () => {
    console.log("Campo email perdiÃ³ el foco. Email actual:", email);
    if (email && email.includes("@")) {
      handleVerifyEmail(email);
    }
  };

  const handleSubmit = async (data: z.infer<typeof ProfileFormSchema>) => {
    clearError();

    // Si el email cambió, requiere verificación
    if (data.email && data.email !== originalEmail) {
      if (emailVerified !== true) {
        toast.error(
          "Por favor verifica que el email esté disponible antes de guardar"
        );
        return;
      }
    }

    try {
      if (customer?.id) {
        await updateCustomer(customer?.id, {
          ...customer,
          ...data,
        } as CustomerbyEmail);

        // Actualizar el auth.store con los nuevos datos del usuario
        updateUser({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
        });

        form.reset();
        toast.success("Datos actualizados correctamente");
      } else {
        setMensaje("Error: Customer ID no disponible.");
        toast.error("Error: Customer ID no disponible.");
      }
    } catch (error) {
      setMensaje("Error al actualizar los datos.");
      toast.error("Error al actualizar los datos.");
    }
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Nombre" {...field} />
                  </FormControl>
                  <FormDescription>Ingresa tu nombre</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Apellido" {...field} />
                  </FormControl>
                  <FormDescription>Ingresa tu apellido</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefono" {...field} />
                  </FormControl>
                  <FormDescription>Ingresa tu telefono</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          handleEmailChange(e);
                        }}
                        onBlur={handleEmailBlur}
                        placeholder="Email"
                      />
                      {/* Indicadores de estado */}
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        {isCheckingEmail && (
                          <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
                        )}
                        {emailVerified === true && (
                          <span className="text-green-500 font-bold text-lg">
                            ✓
                          </span>
                        )}
                        {emailVerified === false && (
                          <span className="text-red-500 font-bold text-lg">
                            ✗
                          </span>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>Ingresa tu email</FormDescription>

                  {/* Mensajes de estado */}
                  {isCheckingEmail && (
                    <p className="text-xs text-blue-600 mt-2">
                      Verificando email...
                    </p>
                  )}
                  {emailVerified === true && (
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Email disponible
                    </p>
                  )}
                  {emailVerified === false && (
                    <p className="text-xs text-red-600 mt-2">
                      ✗ Email ya existe
                    </p>
                  )}
                  {emailError && (
                    <p className="text-xs text-red-600 mt-2">{emailError}</p>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dirección de envío</FormLabel>
                  <FormControl>
                    <Input placeholder="Dirección de envío" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ingresa tu dirección de envío
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Direccion de facturacion</FormLabel>
                  <FormControl>
                    <Input placeholder="Direccion de facturacion" {...field} />
                  </FormControl>
                  <FormDescription>
                    Ingresa tu direccion de facturacion
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="carbonFootprint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Huella de carbono</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Carbon footprint" {...field} />
                  </FormControl>
                  <FormDescription>tu huella de carbono</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Guardar</Button>
          </form>

          {mensaje && <p className="mt-4 text-red-500">{mensaje}</p>}
        </Form>
      </CardContent>
    </Card>
  );
};

export default Profile;
