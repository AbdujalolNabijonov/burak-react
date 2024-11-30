import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import { Message, server } from "../../../lib/config";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";

//Redux
import { createSelector } from "reselect"
import { pausedOrdersRetriever } from "./selector";
import { useSelector } from "react-redux";
import { Order, OrderItem, UpdateOrderInput } from "../../../lib/types/order.type";
import { Product } from "../../../lib/types/product.type";
import { T } from "../../../lib/types/common.type";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/Order.service";

const pausedOrdersSelector = createSelector(
    pausedOrdersRetriever,
    (pausedOrders) => ({ pausedOrders })
)


export default function PausedOrders(props: any) {
    const { setValue } = props;
    const { pausedOrders } = useSelector(pausedOrdersSelector);

    const { authMember, setRebuildOrderData } = useGlobals()

    //Handler
    const onDeleteHandler = async (e: T) => {
        try {
            if (!authMember) await sweetErrorHandling(Message.error3);
            const orderId = e.currentTarget.value as string;

            const input: UpdateOrderInput = {
                orderId,
                orderStatus: OrderStatus.DELETE
            }

            const orderService = new OrderService()
            await orderService.updateOrder(input);
            setRebuildOrderData(new Date())
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    const onPaymentHandler = async (e: T) => {
        try {
            if (!authMember) await sweetErrorHandling(Message.error3);

            const orderId = e.currentTarget.value;
            const input: UpdateOrderInput = {
                orderId,
                orderStatus: OrderStatus.PROCESS
            }
            const orderService = new OrderService();
            if (window.confirm("Do you want to proceed order!")) {
                await orderService.updateOrder(input)
            }
            setRebuildOrderData(new Date())
            setValue("2");
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }

    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((orderItem: OrderItem) => {
                                    const product = order?.productsData?.filter((ele: Product) => ele._id == orderItem.productId)[0] as Product
                                    const imagePath = `${server}/${product.productImages[0]}`
                                    return (
                                        <Box key={orderItem._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${product.productPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderItem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    ${product.productPrice * orderItem.itemQuantity}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderItems?.reduce((a: number, value: OrderItem) => a + value.itemPrice * value.itemQuantity, 0)}</p>
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
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className={"cancel-button"}
                                    onClick={onDeleteHandler}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className={"pay-button"}
                                    onClick={onPaymentHandler}
                                >
                                    Payment
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!pausedOrders ||
                    (pausedOrders.length === 0 && (
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
