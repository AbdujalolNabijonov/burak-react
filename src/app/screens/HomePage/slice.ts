import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen.type";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: []
}

const homePageSlice = createSlice({
    name: "HomePage",
    initialState,
    reducers: {
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setNewDishes: (state, action) => {
            state.newDishes = action.payload
        },
        settopUsers: (state, action) => {
            state.topUsers = action.payload
        }
    }
})

export const {
    setPopularDishes,
    settopUsers,
    setNewDishes
} = homePageSlice.actions
const homePageReducer = homePageSlice.reducer;
export default homePageReducer