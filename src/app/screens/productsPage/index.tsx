import { Container } from "@mui/material"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import ChosenProduct from "./ChosenProduct"
import Products from "./Products"

const ProductsPage = (props: any) => {
    const router = useRouteMatch()
    return (
        <>
            <Switch>
                <Route path={`${router.path}/:productId`}>
                    <ChosenProduct />
                </Route>
                <Route path={`${router.path}`}>
                    <Products />
                </Route>
            </Switch>
        </>
    )
}

export default ProductsPage