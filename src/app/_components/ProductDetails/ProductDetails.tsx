import { ProductType } from '@/types/product.type'
import { Star } from 'lucide-react'
import React from 'react'
import MyButton from '../myButton/MyButton'
import Image from 'next/image'

export default function ProductDetails({ prooductDetails }: { prooductDetails: ProductType }) {
    return <>

        <div className='col-span-4'>
            <Image src={prooductDetails.imageCover} alt={prooductDetails.title} width={500} height={500}/>
        </div>
        <div className='col-span-8 space-y-4'>
            <h2 className='text-2xl font-semibold'>{prooductDetails.title}</h2>
            <h3 className='text-lg text-blue-500'>{prooductDetails.category.name}</h3>
            <p>{prooductDetails.description}</p>

            <div className="flex justify-between items-center w-full">
                <h5>{prooductDetails.price} EGP</h5>
                <h5 className="flex">{prooductDetails.ratingsAverage} <Star className="fill-yellow-500 text-yellow-500" /> </h5>
            </div>

            <MyButton id={prooductDetails._id}/>

        </div>

    </>
}
