import { ProductType } from '@/types/product.type'
import React from 'react'
import Product from '../Product/Product'

export default async function MainProducts() {

    async function getAllProducts() {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/products', {
            next: { revalidate: 10 }
        })
        const { data } = await response.json()
        return data
    }



    const allProducts: ProductType[] = await getAllProducts()


    return <>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5  gap-5">
            {allProducts.map((product) => <Product key={product._id} product={product} />)}
        </div>


    </>
}
