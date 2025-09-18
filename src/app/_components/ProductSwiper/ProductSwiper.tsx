'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { ProductType } from '@/types/product.type';
import Product from '../Product/Product';


export default function ProductSwiper({relatedProducts}:{relatedProducts:ProductType[]}) {
    return <>

        <Swiper slidesPerView={5} spaceBetween={10} autoplay={true} >
            {relatedProducts.map((product) => <SwiperSlide key={product._id} >  <Product product={product}/> </SwiperSlide>)}
        </Swiper>


    </>
}
