import { Customer } from '@/api/customer.api';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ProfileFormSchema = z.object({
    firstName: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    shippingAddress: z.string().min(10, "La dirección debe tener al menos 10 caracteres"),
    carbonFootprint: z.number().min(0, "El carbon footprint debe ser mayor o igual a 0"),
});



interface ProfileProps {
    customer: Customer | null;
}

const Profile = ({customer}: ProfileProps) => {

    const user = customer?.user;

    const form = useForm<z.infer<typeof ProfileFormSchema>>({
        resolver: zodResolver(ProfileFormSchema),
        defaultValues: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            shippingAddress: customer?.shippingAddress,
            carbonFootprint: customer?.carbonFootprint,
        },
    });

    const handleSubmit = () => {
        console.log("Form submitted successfully:", form.getValues());
        form.reset();
    };

    return (
        <Card className="w-full bg-background">
            <CardHeader>
                <CardTitle>Perfil</CardTitle>
            </CardHeader>
            <CardContent className="">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu nombre
                                    </FormDescription>
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
                                    <FormDescription>
                                        Ingresa tu apellido
                                    </FormDescription>
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
                            name="carbonFootprint"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Carbon footprint</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Carbon footprint" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu carbon footprint
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Guardar</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

export default Profile