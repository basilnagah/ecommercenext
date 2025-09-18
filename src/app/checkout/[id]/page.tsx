'use client'
import { makeCashpayment, makeOnlinePayment } from "@/api/checkout.api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/context/cart.context";
import { checkOutSchema, CheckoutType } from "@/schema/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {

    const { id }: { id: string } = useParams()
    const [paymentFlag , setPaymentFlag] = useState('')
    const router = useRouter()
    const context = useContext(CartContext)



    const myForm = useForm<CheckoutType>({
        defaultValues: {
            details: '',
            phone: '',
            city: '',
        },
        resolver: zodResolver(checkOutSchema),
        mode: 'all'
    })


    async function handleCheckout(values: CheckoutType) {

        if(paymentFlag == 'cash'){

            const data =await makeCashpayment(id , values)
            context?.handleCart()
            router.replace('/allorders')

            
            
        }else{

            const data = await makeOnlinePayment(id, 'https://ecommercenext-jade.vercel.app/', values)
               
            if (data.status == 'success') {
                window.location.href = data.session.url
            }
        }
    }




    return <>
        <div className="container px-10 my-10">
            <h1 className='text-3xl font-semibold'>checkout</h1>
            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleCheckout)} className="space-y-6">




                    {/* details */}
                    <FormField
                        control={myForm.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Details:</FormLabel>
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
                    {/* city */}
                    <FormField
                        control={myForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex items-center gap-4">
                        <Button onClick={()=>{setPaymentFlag('online')}} className="bg-blue-500">online payment</Button>
                        <Button onClick={()=>{setPaymentFlag('cash')}} className="bg-blue-500">cash payment</Button>
                    </div>

                </form>

            </Form>

        </div>
    </>
}
