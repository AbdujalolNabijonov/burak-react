import { AppScreenState } from "../../../lib/types/screen.type";
import { createSelector } from "reselect"

const ordersPageState = (state: AppScreenState) => state.ordersPage;


export const pausedOrdersRetriever = createSelector(
    ordersPageState,
    (OrdersPage) => OrdersPage.pausedOrders
)

export const processOrdersRetriever = createSelector(
    ordersPageState,
    (OrdersPage) => OrdersPage.processOrders
)

export const finishedOrdersRetriever = createSelector(
    ordersPageState,
    (OrdersPage) => OrdersPage.finishedOrders
)