import { Member } from "./member.type";
import { Product } from "./product.type"

export interface AppScreenState {
    homePage: HomePageState;
}

export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    activeUsers: Member[];
}