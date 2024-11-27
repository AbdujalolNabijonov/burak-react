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
import { setNewDishes, setPopularDishes } from "./slice"
import { Product } from "../../../lib/types/product.type"
import { useEffect } from "react"
import { popularDishesRetriver } from "./selector"
import { createSelector } from "reselect"
import { server } from "../../../lib/config"
import ProductService from "../../services/Product.service"
import { ProductCollection } from "../../../lib/enums/product.enum"


const dispatchAction = (dispatch: Dispatch) => ({
    setPopularDishes: (products: Product[]) => dispatch(setPopularDishes(products)),
    setNewDishes:(products:Product[])=>dispatch(setNewDishes(products))
})

const popularDishesSelector = createSelector(
    popularDishesRetriver,
    (popularDishes) => ({ popularDishes })
)

const HomePage = (props: any) => {
    const { setPopularDishes, setNewDishes } = dispatchAction(useDispatch());

    useEffect(() => {
        const product = new ProductService();

        //popularDishes
        product.getProducts(
            {
                page: 1,
                limit: 4,
                productCollection: ProductCollection.DISH,
                order: "productViews"
            }
        )
            .then((data) => setPopularDishes(data))
            .catch()

        //New Dishes
        product.getProducts(
            {
                page: 1,
                limit: 4,
                productCollection: ProductCollection.DISH,
                order: "createdAt"
            }
        )
            .then((data) => setNewDishes(data))
            .catch()
    }, [])

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