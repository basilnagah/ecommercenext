import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ProductType } from "@/types/product.type"
import { Eye, Heart, ShoppingCart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import MyButton from "../myButton/MyButton"


export default function Product( {product}:{product:ProductType} ) {
    return <>

        <Card className="group p-2">
            <CardHeader>
                <CardTitle className="relative">
                    <Image src={product.imageCover} alt={product.title} width={500} height={500}/>
                    <div className="flex justify-center items-center gap-2 layer absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all">

                        <ShoppingCart className="text-white w-8 h-8 p-1 rounded-full cursor-pointer hover:text-blue-500 hover:bg-white transition-all" />
                        <Link href={`/products/${product._id}`}> <Eye className="text-white w-8 h-8 p-1 rounded-full cursor-pointer hover:text-blue-500 hover:bg-white transition-all" /> </Link>
                        <Heart className="text-white w-8 h-8 p-1 rounded-full cursor-pointer hover:text-blue-500 hover:bg-white transition-all" />
                    </div>
                </CardTitle>
                <CardDescription className="  text-md"> {product.category.name} </CardDescription>
            </CardHeader>

            <CardContent>
                <p className="line-clamp-1 text-lg text-blue-500 font-semibold" >{product.title}</p>
            </CardContent>

            <CardFooter>
                <div className="flex justify-between items-center w-full">
                    <h5>{product.price} EGP</h5>
                    <h5 className="flex">{product.ratingsAverage} <Star className="fill-yellow-500 text-yellow-500" /> </h5>
                </div>

            </CardFooter>
                <MyButton  id={product._id}/>
        </Card>

    </>
}
