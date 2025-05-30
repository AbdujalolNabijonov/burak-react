import { OrderStatus } from "../enums/order.enum";
import { Product } from "./product.type";

export interface OrderItemInput {
    itemQuantity: number;
    itemPrice: number;
    productId: string;
    orderId?: string;
}

export interface OrderItem {
    _id: string;
    itemQuantity: number;
    itemPrice: number;
    productId: string;
    orderId: string;
    createdAt: Date;
    updatedAt: Date
}

export interface Order {
    _id: string;
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
    createdAt: Date;
    updatedAt: Date;

    orderItems?: OrderItem[],
    productsData?: Product[]
}

export interface OrderInput {
    orderTotal: number;
    orderDelivery: number;
    orderStatus: OrderStatus;
    memberId: string;
}

export interface OrderInquiry {
    page: number,
    limit: number,
    orderStatus: OrderStatus;
}

export interface UpdateOrderInput {
    orderId: string;
    orderStatus: OrderStatus;
}