import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";

//Redux
import { createSelector } from "reselect"
import { pausedOrdersRetriever } from "./selector";
import { useSelector } from "react-redux";

const pausedOrdersSelector = createSelector(
    pausedOrdersRetriever,
    (pausedOrders) => ({ pausedOrders })
)

export default function PausedOrders(props: any) {
    const { setValue } = props;
    const { pausedOrders } = useSelector(pausedOrdersSelector)


    return (
        <TabPanel value={"1"}>
            <Stack>
                {pausedOrders?.map((order: any) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: any) => {
                                    const imagePath = `/img/1.jpg`;
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>Turlkish totilla kebab</p>
                                            <Box className={"price-box"}>
                                                <p>$6.7</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>3</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    $20.1
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>$20.9</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>$4</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>$25</p>
                                </Box>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    color="secondary"
                                    className={"cancel-button"}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className={"pay-button"}
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
