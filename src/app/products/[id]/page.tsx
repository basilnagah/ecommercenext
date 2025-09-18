import { getProductDetails, getRelatedProducts } from '@/api/product.api'
import ProductDetails from '@/app/_components/ProductDetails/ProductDetails'
import ProductSwiper from '@/app/_components/ProductSwiper/ProductSwiper'
import { ProductType } from '@/types/product.type'
import React from 'react'


export default async function page({ params } : { params:Promise<{id:string}> }) {

    const { id } = await params


    const prooductDetails: ProductType = await getProductDetails(id)


    const relatedProducts: ProductType[] = await getRelatedProducts(prooductDetails.category._id)




    return <>


        <div className="container py-8">
            <div className="grid grid-cols-12 gap-8">
                <ProductDetails prooductDetails={prooductDetails} />
            </div>

            <h2 className='text-3xl font-semibold'>Related Products</h2>


            <ProductSwiper relatedProducts={relatedProducts} />
        
        </div>


    </>
}
