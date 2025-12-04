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
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const formBrandSchema = z
  .object({
    nombreComercial: z.string().min(2, {
      message: "El nombre comercial debe tener al menos 2 caracteres.",
    }),
    razonSocial: z.string().min(2, {
      message: "La razón social debe tener al menos 2 caracteres.",
    }),
    cuit: z.string().regex(/^\d{2}-\d{8}-\d{1}$/, {
      message: "El formato debe ser XX-XXXXXXXX-X",
    }),
    categoria: z.string().min(1, {
      message: "Por favor selecciona una categoría.",
    }),
    pais: z.string().min(1, {
      message: "Por favor selecciona un país.",
    }),
    email: z.string().email({
      message: "Por favor ingresa un email válido.",
    }),
    password: z
      .string()
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .regex(/[A-Z]/, { message: "Debe contener al menos una mayúscula." })
      .regex(/[a-z]/, { message: "Debe contener al menos una minúscula." })
      .regex(/[0-9]|[^A-Za-z0-9]/, {
        message: "Debe contener un número o carácter especial.",
      }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "Debes aceptar los términos y condiciones.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
  });

export default function RegisterNewBrand() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const form = useForm<z.infer<typeof formBrandSchema>>({
    resolver: zodResolver(formBrandSchema),
    defaultValues: {
      nombreComercial: "",
      razonSocial: "",
      cuit: "",
      categoria: "",
      pais: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = () => {
    console.log("Form submitted successfully:", form.getValues());
    form.reset();
    setErrors({});
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
                  <h3 className="font-semibold ">
                    Certificación Ecológica
                  </h3>
                  <p className="text-sm">
                    Valida tus prácticas sostenibles
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">Red Global</h3>
                  <p className="text-sm">
                    Conecta con compradores conscientes
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold ">
                    Gestión Transparente
                  </h3>
                  <p className="text-sm ">
                    Herramientas para tu crecimiento
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <Card>
            <CardContent>
              <CardHeader>
                <h2 className="text-xl font-semibold  mb-1">
                  Información Empresarial
                </h2>
                <p className="text-sm  mb-6">
                  Completa los datos de tu empresa para comenzar
                </p>
              </CardHeader>

              <Form {...form}>
                <form onSubmit={handleSubmit}>
                  <FormField
                    control={form.control}
                    name="nombreComercial"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Telefono</FormLabel>
                        <FormControl>
                          <Input placeholder="Telefono" {...field} />
                        </FormControl>
                        <FormDescription>Telefono del usuario</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="razonSocial"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Razón Social</FormLabel>
                        <FormControl>
                          <Input placeholder="Razón Social" {...field} />
                        </FormControl>
                        <FormDescription>
                          Razón Social del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cuit"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>CUIT</FormLabel>
                        <FormControl>
                          <Input placeholder="CUIT" {...field} />
                        </FormControl>
                        <FormDescription>CUIT del usuario</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <FormField
                      control={form.control}
                      name="categoria"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel>Categoría de Producto</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar categoría" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="alimentos">
                                  Alimentos Orgánicos
                                </SelectItem>
                                <SelectItem value="textil">
                                  Textil Sostenible
                                </SelectItem>
                                <SelectItem value="cosmetica">
                                  Cosmética Natural
                                </SelectItem>
                                <SelectItem value="limpieza">
                                  Productos de Limpieza
                                </SelectItem>
                                <SelectItem value="otros">Otros</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>
                            Categoría del producto
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pais"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>País</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Seleccionar país" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ar">Argentina</SelectItem>
                                <SelectItem value="br">Brasil</SelectItem>
                                <SelectItem value="cl">Chile</SelectItem>
                                <SelectItem value="co">Colombia</SelectItem>
                                <SelectItem value="mx">México</SelectItem>
                                <SelectItem value="es">España</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription>País del producto</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" type="email" {...field} />
                        </FormControl>
                        <FormDescription>Email del usuario</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Contraseña"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Contraseña del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel>Confirmar Contraseña</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Confirmar Contraseña"
                            type="password"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Confirmar Contraseña del usuario
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <div className="flex items-start gap-3">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 shrink-0"
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal text-gray-600 leading-tight cursor-pointer w-full">
                            <span className="block w-full">
                              Acepto los{" "}
                              <span className="text-green-600 font-medium hover:underline cursor-pointer">
                                Términos y Condiciones
                              </span>{" "}
                              y la{" "}
                              <span className="text-green-600 font-medium hover:underline cursor-pointer">
                                Política de Privacidad
                              </span>{" "}
                              de EcoSupply. Confirmo que la información
                              proporcionada es veraz y que mi empresa cumple con
                              los estándares de sostenibilidad requeridos.
                            </span>
                          </FormLabel>
                        </div>
                        <FormMessage className="ml-8" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-base"
                  >
                    Crear Cuenta →
                  </Button>
                </form>
              </Form>

              <p className="text-xs text-center text-gray-500 pt-2">
                Al registrarte, recibirás un correo de verificación para activar
                tu cuenta
              </p>

              <div className="flex items-center justify-center gap-4 pt-4 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Conexión Segura</span>
                </div>
                <div className="flex items-center gap-1">
                  <Lock className="w-4 h-4" />
                  <span>Datos Encriptados</span>
                </div>
                <div className="flex items-center gap-1">
                  <Database className="w-4 h-4" />
                  <span>Certificado SSL</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
