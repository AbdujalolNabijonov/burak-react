import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";


//Redux
import { createSelector } from "reselect";
import { finishedOrdersRetriever } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem } from "../../../lib/types/order.type";
import { Product } from "../../../lib/types/product.type";
import { server } from "../../../lib/config";

const finishedOrdersSelector = createSelector(
    finishedOrdersRetriever,
    (finishedOrders) => ({ finishedOrders })
)

export default function FinishedOrders() {
    const { finishedOrders } = useSelector(finishedOrdersSelector)

    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((orderItem: OrderItem) => {
                                    const product = order?.productsData?.filter((ele: Product) => ele._id === orderItem.productId)[0] as Product;
                                    const imagePath = `${server}/${product.productImages[0].replace(/\\/g, "/")}`;
                                    return (
                                        <Box key={orderItem._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${orderItem.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderItem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    ${orderItem.itemQuantity * orderItem.itemPrice}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order?.orderItems?.reduce((a: number, value: OrderItem) => a + value.itemPrice * value.itemQuantity, 0)}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}

                {!finishedOrders ||
                    (finishedOrders.length === 0 && (
                        <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"center"}
                        >
                            <img
                                src={"/icons/noimage-list.svg"}
                                style={{ width: 300, height: 300 }}
                            />
                        </Box>
                    ))}
            </Stack>
        </TabPanel>
    );
}
