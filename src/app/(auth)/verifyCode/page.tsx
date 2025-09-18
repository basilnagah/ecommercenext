/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema, verifyType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
    const router = useRouter()

    const myForm = useForm<verifyType>({
        defaultValues: {
            resetCode: '',
        },
        resolver: zodResolver(verifySchema),
        mode: 'all'
    })



    async function handleLogin(values: verifyType) {

        const loadingId = toast.loading('loading.....', { position: 'top-right' })

        try {
            const { data } = await axios.request({
                url: 'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
                method: 'post',
                data: values
            })

            console.log(data);
                
                toast.success('code vereified' , { position: 'top-right', duration: 2000 })
                setTimeout(() => {
                router.push('/resetPassword')
                    
                }, 1000);
        } catch (error: any) {
            toast.error(error.response.data.message, { position: 'top-right', duration: 2000 })
        } finally {
            toast.dismiss(loadingId)
        }
    }




    return <>
        <div className="w-1/2 mx-auto my-12">

            <h1 className="text-3xl font-semibold">Verify Code:</h1>

            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleLogin)} className="space-y-6">




                    {/* resetCode */}
                    <FormField
                        control={myForm.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>resetCode:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-between items-center">
                    <Button className="bg-blue-500">Verify</Button>
                    </div>

                </form>

            </Form>


        </div>


    </>
}
