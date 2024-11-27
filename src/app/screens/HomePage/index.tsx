import { Container } from "@mui/material"
import Statistics from "./Statistics"
import PopularDishes from "./PopularDishes"
import NewDishes from "./NewDishes"
import Advertisement from "./Advertisement"
import ActiveUsers from "./ActiveUsers"
import Events from "./Events";
import "../../../css/home.css"

//**REDUX 
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"
import { setPopularDishes } from "./slice"
import { Product } from "../../../lib/types/product.type"
import { useEffect } from "react"
import { popularDishesRetriver } from "./selector"
import { createSelector } from "reselect"


const dispatchAction = (dispatch: Dispatch) => ({
    setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data))
})

const popularDishesSelector = createSelector(
    popularDishesRetriver,
    (popularDishes) => ({ popularDishes })
)

const HomePage = (props: any) => {
    const { setPopularDishes } = dispatchAction(useDispatch());
    const popularDishes = useSelector(popularDishesSelector)

    return (
        <div className="homepage">
            <Statistics />
            <PopularDishes />
            <NewDishes />
            <Advertisement />
            <ActiveUsers />
            <Events />
        </div>
    )
}

export default HomePage