export type ProductType = {
    sold?: number,
    images: string[],
    subcategory:SubcategoryType[],
    ratingsQuantity:number,
    _id:string,
    title:string,
    slug:string,
    description:string,
    quantity:number,
    price:number,
    imageCover:string,
    category:CategoryType,
    brand:BrandType,
    ratingsAverage:number,
    createdAt:string,
    updatedAt:string,
    id:string,
}




type SubcategoryType = {
    _id: string,
    name: string,
    slug: string,
    category: string,
}


export type CategoryType={
    _id: string,
    name: string,
    slug: string,
    image:string,
    category: string,
}
type BrandType={
    _id: string,
    name: string,
    slug: string,
    category: string,
}