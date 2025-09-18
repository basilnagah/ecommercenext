/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ClearCart } from "@/api/cart.api"
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import CartItem from "../_components/cartItem/CartItem";
import Link from "next/link";
import { toast } from "sonner";
import { CartContext } from "@/context/cart.context";
import { Button } from "@/components/ui/button";
import { CartType } from "@/types/cart.type";


export default function Cart() {

  const [isLoading, setIsLoading] = useState(true)
  const cartContext = useContext(CartContext)
  const [cartData, setCartData] = useState<CartType | undefined>(undefined)


  async function handleGetProductsFromCart() {
    setIsLoading(true)
    const data = await cartContext?.handleCart()
    setIsLoading(false)
    setCartData(data)


  }





  async function handleClearCart() {

    const data = await ClearCart()
    console.log(data);
    if (data.message == 'success') {
      cartContext?.setAllProducts([])
      toast.success('cart cleared successfully', { position: 'top-right', duration: 2000 })

    }

  }


  useEffect(() => {
    handleGetProductsFromCart()
  }, [])


  if (isLoading) {
    return <h2 className="text-center my-5 text-3xl">loadinggggggg</h2>
  }




  return <>




    <div className="container">
      <div className="bg-slate-200 p-10 my-10">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="flex items-center gap-3 text-3xl"> <ShoppingCart /> Shopping Cart </h2>
            <h3 className="text-blue-500 my-2">total cart price : {cartContext?.totalPrice} EGP</h3>
          </div>

          <button onClick={handleClearCart} className="bg-red-600 text-white px-5 py-3 rounded-xl cursor-pointer">Clear Cart</button>
        </div>



        {cartContext?.allProducts.length ?
          <>
            {cartContext?.allProducts.map((product) => <CartItem key={product.product.id} product={product} />)}

            <div className="flex justify-end">

              <Link href={`/checkout/${cartData?.cartId}`}><Button className="ms-auto m-4 bg-blue-500 cursor-pointer hover:bg-white hover:text-blue-500 hover:outline-2 hover:outline-blue-500 hover:outline-solid transition-all">go to CheckOut</Button></Link>
            </div>
          </>
          :
          <div className="flex justify-center">
            <h2>cart is empty , go add some products to cart <Link className="bg-green-600 text-white rounded-xl px-5 py-2 my-8" href={'/products'}>Shop Now</Link></h2>
          </div>
        }


      </div>
    </div>


  </>
}
