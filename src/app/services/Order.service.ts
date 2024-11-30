import axios from "axios";
import { server } from "../../lib/config";
import { Order, OrderInquiry, UpdateOrderInput } from "../../lib/types/order.type";
import { CartItem } from "../../lib/types/search.type";

class OrderService {
    private readonly path;
    constructor() {
        this.path = server
    }

    public async createOrder(cartItems: CartItem[]): Promise<void> {
        try {
            const cartItemsInput = cartItems.map((ele: CartItem) => {
                return {
                    productId: ele._id,
                    itemPrice: ele.price,
                    itemQuantity: ele.quantity
                }
            })

            const url = `${this.path}/order/create`;
            const response = await axios.post(url, cartItemsInput, { withCredentials: true });
            return response.data
        } catch (err: any) {
            console.log(`Error: createOrder, ${err.message}`);
            throw err
        }
    }

    public async getOrders(input: OrderInquiry): Promise<Order[]> {
        try {
            const url = `${this.path}/order/all/`
            const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

            const response = await axios.get(url + query, { withCredentials: true });

            return response.data
        } catch (err: any) {
            console.log(`Error: getOrders, ${err.message}`);
            throw err
        }
    }

    public async updateOrder(input: UpdateOrderInput): Promise<any> {
        try {
            const url = `${this.path}/order/update`;
            const response = await axios.post(url, input, { withCredentials: true });
            return response.data;
        } catch (err: any) {
            console.log(`Error: updateOrder, ${err.message}`);
            throw err
        }
    }
}

export default OrderService