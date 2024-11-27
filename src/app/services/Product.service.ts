import { server } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product.type";
import axios from "axios";

class ProductService {
    private readonly server;
    constructor() {
        this.server = server
    }

    public async getProducts(input: ProductInquiry): Promise<Product[]> {
        try {
            let url = `${this.server}/product/all/?page=${input.page}&limit=${input.limit}&order=${input.order}`
            if (input.productCollection) url += `&productCollection=${input.productCollection}`
            if (input.search) url += `&search=${input.search}`;

            const result = await axios.get(url);

            return result.data;
        } catch (err: any) {
            console.log(`Error: getProducts, ${err.message}`);
            throw err
        }
    }
}

export default ProductService