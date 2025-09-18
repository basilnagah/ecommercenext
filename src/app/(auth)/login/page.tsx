'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema, LoginType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { signIn, SignInResponse } from 'next-auth/react'



export default function Login() {
    const [isPassword, setIsPassword] = useState(true)

    const myForm = useForm<LoginType>({
        defaultValues: {
            email: '',
            password: ''
        },
        resolver: zodResolver(LoginSchema),
        mode: 'all'
    })



    async function handleLogin(values: LoginType) {


        const response:SignInResponse|undefined = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
        })        
        

        if (response?.ok) {
            toast.success('logged in successfully' , {position:'top-right' , duration:2000})
            
            window.location.href='/'

        } else { 
            toast.error('error occured' , {position:'top-right' , duration:2000})
        }

    }




    return <>
        <div className="w-1/2 mx-auto my-12">

            <h1 className="text-3xl font-semibold">Login Now:</h1>

            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleLogin)} className="space-y-6">




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
                                        <EyeClosed onClick={() => { setIsPassword(true) }} className={`absolute top-2 right-2 ${isPassword ? "hidden" : 'block'}`} />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center">
                        <Button className="bg-blue-500">Login</Button>
                        <Link href={'/forgetPassword'} className="text-blue-500 underline">forget your passowrd</Link>
                    </div>

                </form>

            </Form>


        </div>


    </>
}
