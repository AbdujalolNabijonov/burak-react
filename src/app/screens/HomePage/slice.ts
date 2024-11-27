import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen.type";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    activeUsers: []
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
        setActiveUsers: (state, action) => {
            state.activeUsers = action.payload
        }
    }
})

export const { setPopularDishes, setActiveUsers, setNewDishes } = homePageSlice.actions
const homePageReducer = homePageSlice.reducer;
export default homePageReducer