import { AppScreenState } from "../../../lib/types/screen.type";
import { createSelector } from "reselect"

const productPageState = (state: AppScreenState) => state.productPage;

export const chosenProductRetriever = createSelector(
    productPageState,
    (ProductPage) => ProductPage.chosenProduct
)

export const productsRetriever = createSelector(
    productPageState,
    (ProductPage) => ProductPage.products
)