import React from "react";
import { Box, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";


export default function FinishedOrders() {
    const finishedOrders = [
        {
            orderItems: [1, 2, 3]
        }
    ];

    return (
        <TabPanel value={"3"}>
            <Stack>
                {finishedOrders?.map((order: any) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: any) => {
                                    const imagePath = "/img/1.jpg";
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>Turkish steak</p>
                                            <Box className={"price-box"}>
                                                <p>$20</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>2</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    $40
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>$40</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>Delivery cost</p>
                                    <p>$4</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>$44</p>
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
