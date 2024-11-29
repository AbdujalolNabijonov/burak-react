import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen.type";

const initialState: OrdersPageState = {
    pausedOrders: [],
    processOrders: [],
    finishedOrders: []
}

const ordersPageSlice = createSlice({
    name: "OrdersPage",
    initialState,
    reducers: {
        setPausedOrders: (state, action) => {
            state.pausedOrders = action.payload
        },
        setProcessOrders: (state, action) => {
            state.processOrders = action.payload
        },
        setFinishedOrders: (state, action) => {
            state.finishedOrders = action.payload
        }
    }
})

export const {
    setPausedOrders,
    setProcessOrders,
    setFinishedOrders
} = ordersPageSlice.actions
const ordersPageReducer = ordersPageSlice.reducer;
export default ordersPageReducer