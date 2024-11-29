import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen.type";

const initialState: ProductPageState = {
    chosenProduct: null,
    products: [],
    restaurant:null
}

const productPageSlice = createSlice({
    name: "ProductPage",
    initialState,
    reducers: {
        setChosenProduct: (state, action) => {
            state.chosenProduct = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setRestaurant:(state, action)=>{
            state.restaurant = action.payload
        }
    }
})

export const { setChosenProduct, setProducts, setRestaurant } = productPageSlice.actions;
const productsPageReducer = productPageSlice.reducer;
export default productsPageReducer;