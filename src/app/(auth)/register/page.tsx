/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Register() {

    const [isPassword, setIsPassword] = useState(true)

    const router = useRouter()



    const myForm = useForm<RegisterType>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: "",

        },
        resolver: zodResolver(RegisterSchema),
        mode: 'all'
    })

    async function handleRegister(values: RegisterType) {
        const loadingId = toast.loading('loading....', { position: 'top-right' })
        try {
            const options = {
                url: 'https://ecommerce.routemisr.com/api/v1/auth/signup',
                method: 'post',
                data: values
            }
            const { data } = await axios.request(options)
            if (data.message == 'success') {
                toast.success('account created successfully', { position: 'top-right', duration: 2000 })
                
                setTimeout(() => {
                    router.push('login')
                }, 1000);
            }

        } catch (error: any) {
            toast.error(error.response.data.message, { position: 'top-right', duration: 2000 })

        } finally {
            toast.dismiss(loadingId)
        }
    }






    return <>

        <div className="w-1/2 mx-auto my-12">

            <h1 className="text-3xl font-semibold">Register Now:</h1>

            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleRegister)} className="space-y-6">



                    {/* name */}
                    <FormField
                        control={myForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* email */}
                    <FormField
                        control={myForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* password */}
                    <FormField
                        control={myForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password:</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input  {...field} type={isPassword ? 'password' : 'text'} />
                                        <Eye onClick={() => { setIsPassword(false) }} className={`absolute top-2 right-2 ${isPassword ? "block" : 'hidden'}`} />
                                        <EyeClosed onClick={() => { setIsPassword(true) }}  className={`absolute top-2 right-2 ${isPassword ? "hidden" : 'block'}`} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* rePassword */}
                    <FormField
                        control={myForm.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>confirm password:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* phone */}
                    <FormField
                        control={myForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button className="bg-blue-500">Register</Button>

                </form>

            </Form>
        </div>

    </>
}
