import { getAllCategories } from '@/api/category.api';
import { CategoryType } from '@/types/product.type';
import SwiperCategory from '../Swiper/Swiper';


export default async function CategorySlider() {

    const allCategories: CategoryType[] = await getAllCategories()




    return <>
            <h2 className='text-3xl font-semibold'>All Categories</h2>
        <SwiperCategory allCategories={allCategories} />
  
    </>
}
