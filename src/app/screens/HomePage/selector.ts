import { createSelector } from "reselect";
import { AppScreenState } from "../../../lib/types/screen.type";

const homePageState = (state: AppScreenState) => state.homePage;

export const popularDishesRetriver = createSelector(
    homePageState,
    (HomePage) => HomePage.popularDishes
)

export const newDishesRetriever = createSelector(
    homePageState,
    (HomePage) => HomePage.newDishes
)

export const topUsersRetriever = createSelector(
    homePageState,
    (HomePage) => HomePage.topUsers
)