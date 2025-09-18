'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { CategoryType } from '@/types/product.type';




export default function SwiperCategory({ allCategories }: { allCategories: CategoryType[] }) {
    return <>

        <Swiper slidesPerView={7} autoplay={true} loop >
            {allCategories.map((category) => <SwiperSlide key={category.name}>
               <Image src={category.image} alt={category.name} width={500} height={500} className='object-cover h-[200px]'/>
                <h3 className='font-semibold'>{category.name}</h3>
            </SwiperSlide>)}
        </Swiper>



    </>
}
