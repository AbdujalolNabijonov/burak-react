import { Member } from "./member.type";
import { Order } from "./order.type";
import { Product } from "./product.type"

export interface AppScreenState {
    homePage: HomePageState;
    productPage: ProductPageState;
    ordersPage: OrdersPageState;
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

export interface OrdersPageState {
    pausedOrders: Order[],
    processOrders: Order[],
    finishedOrders: Order[]
}