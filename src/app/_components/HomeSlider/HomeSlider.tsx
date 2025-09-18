'use client'
import Image from 'next/image'
import image1 from '../../../../public/images/slider-image-1.jpeg'
import image2 from '../../../../public/images/slider-image-2.jpeg'
import image3 from '../../../../public/images/slider-image-3.jpeg'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';

export default function HomeSlider() {
    return <>

        <div className='grid grid-cols-12'>

            <div className='col-span-8'>
                <Swiper slidesPerView={1}  autoplay={true} loop >
                    <SwiperSlide> <Image src={image1} alt='image1' className='h-[500px]' /> </SwiperSlide>
                    <SwiperSlide> <Image src={image2} alt='image1' className='h-[500px]' /> </SwiperSlide>
                    <SwiperSlide> <Image src={image3} alt='image1' className='h-[500px]' /> </SwiperSlide>
                </Swiper>

            </div>
            <div className='col-span-4'>

                <Image src={image2} alt='image1' height={250} />
                <Image src={image3} alt='image1' height={250} />
            </div>

        </div>
    </>
}
