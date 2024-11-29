import { TabPanel } from "@mui/lab";
import { Box, Button, Stack } from "@mui/material";
import moment from "moment";


//REDUX
import { createSelector } from "reselect"
import { processOrdersRetriever } from "./selector";
import { useSelector } from "react-redux";

const processOrdersSelector = createSelector(
    processOrdersRetriever,
    (processOrders) => ({ processOrders })
)

export default function ProcessOrders(props: any) {
    const { setValue } = props;
    const { processOrders } = useSelector(processOrdersSelector)

    return (
        <TabPanel value={"2"}>
            <Stack>
                {processOrders?.map((order: any) => {
                    return (
                        <Box key={order._id} className={"order-main-box"}>
                            <Box className={"order-box-scroll"}>
                                {order?.orderItems?.map((item: any) => {
                                    const imagePath = "/img/1.jpg";
                                    return (
                                        <Box key={item._id} className={"orders-name-price"}>
                                            <img src={imagePath} className={"order-dish-img"} />
                                            <p className={"title-dish"}>kebab</p>
                                            <Box className={"price-box"}>
                                                <p>$13</p>
                                                <img src={"/icons/close.svg"} />
                                                <p>3</p>
                                                <img src={"/icons/pause.svg"} />
                                                <p style={{ marginLeft: "15px" }}>
                                                    $130
                                                </p>
                                            </Box>
                                        </Box>
                                    );
                                })}
                            </Box>

                            <Box className={"total-price-box"}>
                                <Box className={"box-total"}>
                                    <p>Product price</p>
                                    <p>$4</p>
                                    <img src={"/icons/plus.svg"} style={{ marginLeft: "20px" }} />
                                    <p>delivery cost</p>
                                    <p>$134</p>
                                    <img
                                        src={"/icons/pause.svg"}
                                        style={{ marginLeft: "20px" }}
                                    />
                                    <p>Total</p>
                                    <p>${order.orderTotal}</p>
                                </Box>
                                <p className={"data-compl"}>
                                    {moment().format("YY-MM-DD HH:mm")}
                                </p>
                                <Button
                                    value={order._id}
                                    variant="contained"
                                    className={"verify-button"}
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