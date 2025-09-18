/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { resetSchema, resetType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
    const router = useRouter()

    const myForm = useForm<resetType>({
        defaultValues: {
            email: '',
            newPassword: ''
        },
        resolver: zodResolver(resetSchema),
        mode: 'all'
    })



    async function handleLogin(values: resetType) {

        const loadingId = toast.loading('loading.....', { position: 'top-right' })

        try {
             await axios.request({
                url: 'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
                method: 'put',
                data: values
            })

            toast.success('code vereified' , { position: 'top-right', duration: 2000 })
            setTimeout(() => {
            router.push('/login')

            }, 1000);
        } catch (error: any) {
            toast.error(error.response.data.message, { position: 'top-right', duration: 2000 })
        } finally {
            toast.dismiss(loadingId)
        }
    }




    return <>
        <div className="w-1/2 mx-auto my-12">

            <h1 className="text-3xl font-semibold">Reset Paassword:</h1>

            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleLogin)} className="space-y-6">




                    {/* email */}
                    <FormField
                        control={myForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    {/* newPassword */}
                    <FormField
                        control={myForm.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>new password:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex justify-between items-center">
                        <Button className="bg-blue-500">submit</Button>
                    </div>

                </form>

            </Form>


        </div>


    </>
}
