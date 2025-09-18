export default interface CartResponse {
    status:         string;
    numOfCartItems: number;
    cartId:         string;
    data:           Data;
}

interface Data {
    _id:            string;
    cartOwner:      string;
    products:       ProductElement[];
    createdAt:      Date;
    updatedAt:      Date;
    __v:            number;
    totalCartPrice: number;
}

interface ProductElement {
    count:   number;
    _id:     string;
    product: ProductProduct;
    price:   number;
}

interface ProductProduct {
    subcategory:    Brand[];
    _id:            string;
    title:          string;
    quantity:       number;
    imageCover:     string;
    category:       Brand;
    brand:          Brand;
    ratingsAverage: number;
    id:             string;
}

interface Brand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}
