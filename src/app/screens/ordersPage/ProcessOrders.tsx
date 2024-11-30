
import React from "react"
import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import { Order, OrderItem, UpdateOrderInput } from "../../../lib/types/order.type";
import { Product } from "../../../lib/types/product.type";
import { Message, server } from "../../../lib/config";
import { T } from "../../../lib/types/common.type";


//REDUX
import { createSelector } from "reselect"
import { processOrdersRetriever } from "./selector";
import { useSelector } from "react-redux";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/Order.service";

const processOrdersSelector = createSelector(
    processOrdersRetriever,
    (processOrders) => ({ processOrders })
)

interface ProcessOrdersProps {
    setValue: (value: string) => void
}

export default function ProcessOrders(props: ProcessOrdersProps) {
    const { setValue } = props;
    const { processOrders } = useSelector(processOrdersSelector)
    const { authMember, setRebuildOrderData } = useGlobals()
    //Handlers
    const onFinishHandler = async (e: T) => {
        try {
            if (!authMember) throw new Error(Message.error3);
            const orderId = e.currentTarget.value as string;
            const input: UpdateOrderInput = {
                orderId,
                orderStatus: OrderStatus.FINISH
            }

            const orderService = new OrderService();
            await orderService.updateOrder(input);

            setRebuildOrderData(new Date())
            setValue("3")
        } catch (err: any) {
            await sweetErrorHandling(err)
        }
    }
    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: Order) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((orderitem: OrderItem) => {
                                    const product = order?.productsData?.filter((ele: Product) => ele._id === orderitem.productId)[0] as Product;
                                    const imagePath = `${server}/${product.productImages[0].replace(/\\/g, "/")}`;
                                    return (
                                        <Box key={orderitem._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>{product.productName}</p>
                                            <Box className={"price-box"}>
                                                <p>${orderitem.itemPrice}</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>{orderitem.itemQuantity}</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    ${orderitem.itemPrice * orderitem.itemQuantity}
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>${order.orderItems?.reduce((a: number, ele: OrderItem) => a + ele.itemPrice * ele.itemQuantity, 0)}</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>delivery cost</p>
                                    <p>${order.orderDelivery}</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <p className={"data-compl"}>
                                    {moment(order.updatedAt).format("YY-MM-DD HH:mm")}
                                </p>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className={"verify-button"}
                                    onClick={onFinishHandler}
                                >
                                    Verify to Fulfil
                                </Button>
                            </Box>
                        </Box>
                    );
                })}

                {!processOrders ||
                    (processOrders.length === 0 && (
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