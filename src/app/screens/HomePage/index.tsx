import { Container } from "@mui/material"
import Statistics from "./Statistics"
import PopularDishes from "./PopularDishes"
import NewDishes from "./NewDishes"
import Advertisement from "./Advertisement"
import ActiveUsers from "./ActiveUsers"
import Events from "./Events";
import "../../../css/home.css"

//**REDUX 
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit"
import { settopUsers, setNewDishes, setPopularDishes } from "./slice"
import { Product } from "../../../lib/types/product.type"
import { useEffect } from "react"
import ProductService from "../../services/Product.service"
import { ProductCollection } from "../../../lib/enums/product.enum"
import MemberService from "../../services/Member.service"
import { Member } from "../../../lib/types/member.type"


const dispatchAction = (dispatch: Dispatch) => ({
    setPopularDishes: (products: Product[]) => dispatch(setPopularDishes(products)),
    setNewDishes: (products: Product[]) => dispatch(setNewDishes(products)),
    settopUsers: (members: Member[]) => dispatch(settopUsers(members))
})


const HomePage = (props: any) => {
    const { setPopularDishes, setNewDishes, settopUsers } = dispatchAction(useDispatch());

    useEffect(() => {
        const product = new ProductService();
        const member = new MemberService();

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

        //Top users
        member.getTopUsers()
            .then(data => settopUsers(data))
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