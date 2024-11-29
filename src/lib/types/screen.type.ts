import { Member } from "./member.type";
import { Product } from "./product.type"

export interface AppScreenState {
    homePage: HomePageState;
    productPage: ProductPageState;
}

export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}

export interface ProductPageState {
    chosenProduct: Product | null;
    products: Product[],
    restaurant: Member | null
}