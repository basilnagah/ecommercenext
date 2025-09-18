'use client'
import { DeleteProductFromCart, updateProductCount } from '@/api/cart.api'
import { CartContext } from '@/context/cart.context'
import { CartProductType } from '@/types/cart.type'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function CartItem({ product }: { product: CartProductType }) {

    const [isLoading, setIsLoading] = useState(false)
    const cartContext = useContext(CartContext)

    async function handleDeleteFromCart() {
        setIsLoading(true)

        try {
            const data = await DeleteProductFromCart(product.product.id)
            console.log(data);

            if (data.status == 'success') {
                toast.success('product removed successfully', { position: 'top-right', duration: 2000 })

                cartContext?.handleCart()
            }

        } catch (error) {
            toast.error('error occured', { position: 'top-right', duration: 2000 })
            console.log(error);

        } finally {
            setIsLoading(false)
        }
    }

    async function handleUpdateProduct(newCount: number) {
        setIsLoading(true)

        try {
            const data = await updateProductCount(product.product.id, newCount)
            if (data.status == 'success') {
                toast.success('product updated successfully', { position: 'top-right', duration: 2000 })
               
                cartContext?.handleCart()

            }
        } catch (error) {
            toast.error('error occured', { position: 'top-right', duration: 2000 })
            console.log(error);

        } finally {
            setIsLoading(false)
        }

    }


    return <>
        <div className="flex justify-between items-center border-b-2 border-b-slate-400 py-10">
            <div className="flex gap-3">
                <Image src={product.product.imageCover} alt={product.product.title} width={500} height={500} className='w-[100px]' />
                <div className='space-y-2'>
                    <h3>{product.product.title}</h3>
                    <h4>Price: {product.price} x {product.count} = {product.price*product.count} EGP</h4>
                    <button disabled={isLoading} onClick={handleDeleteFromCart} className={` text-white rounded-lg px-6 py-2 flex gap-2 items-center bg-red-600 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed`}> <Trash /> Remove</button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button disabled={isLoading} onClick={() => handleUpdateProduct(product.count - 1)} className="bg-blue-500 text-white rounded-xl w-10 h-10 text-2xl  cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300">-</button>
                <h4 className="text-xl"> {isLoading ?  <i className='fa-solid fa-spin fa-spinner text-blue-500'></i>  :  product.count }</h4>
                <button disabled={isLoading} onClick={() => handleUpdateProduct(product.count + 1)} className="bg-blue-500 text-white rounded-xl w-10 h-10 text-2xl cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-300">+</button>
            </div>
        </div>


    </>
}
