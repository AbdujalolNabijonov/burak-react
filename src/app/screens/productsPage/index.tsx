import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import ChosenProduct from "./ChosenProduct";
import Products from "./Products";
import "../../../css/products.css";
import { CartItem } from "../../../lib/types/search.type";

interface ProductsPageProps {
    onAdd: (item: CartItem) => void
}
export default function ProductsPage(props: ProductsPageProps) {
    const products = useRouteMatch();
    const {onAdd} = props;

    return (
        <div className={"products-page"}>
            <Switch>
                <Route path={`${products.path}/:productId`}>
                    <ChosenProduct onAdd={onAdd}/>
                </Route>
                <Route path={`${products.path}`}>
                    <Products onAdd={onAdd}/>
                </Route>
            </Switch>
        </div>
    );
}
