'use client'
import { getProductsFromCart } from "@/api/cart.api";
import { CartType } from "@/types/cart.type";
import { ProductType } from "@/types/product.type";
import { createContext, useEffect, useState } from "react";

type Product = {
  count: number;
  _id: number;
  price: number;
  product:ProductType
};

type CartContextType = {
  numOfCartItems: number | null;
  handleCart: () => Promise<CartType>; 
  allProducts: Product[];
  setAllProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  totalPrice: number;
};

export const CartContext = createContext<CartContextType | null>(null);

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);







  async function handleCart() {
    try {
      const data = await getProductsFromCart();
      setAllProducts(data.data.products);

      let sum: number = 0;
      data.data.products.forEach((product: Product) => {
        sum += product.count;
      });

      setNumOfCartItems(sum);
      setTotalPrice(data.data.totalCartPrice);

      console.log(data);
      
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleCart();
  }, []);

  return (
    <CartContext.Provider value={{  numOfCartItems, handleCart, allProducts,setAllProducts,totalPrice}}>
      {children}
    </CartContext.Provider>
  );
}
