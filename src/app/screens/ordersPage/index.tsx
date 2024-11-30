import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, Pagination, PaginationItem } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/orders.css"
import { ArrowBack, ArrowForward } from "@mui/icons-material"


//REDUX
import { Dispatch } from "@reduxjs/toolkit";
import { Order, OrderInquiry } from "../../../lib/types/order.type";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { useDispatch } from "react-redux";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/Order.service";
import { useGlobals } from "../../hooks/useGlobals";
import { Message, server } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";
import { useHistory } from "react-router-dom";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common.type";

const actionsDispatch = (dispatch: Dispatch) => ({
    setPausedOrders: (orders: Order[]) => dispatch(setPausedOrders(orders)),
    setProcessOrders: (orders: Order[]) => dispatch(setProcessOrders(orders)),
    setFinishedOrders: (orders: Order[]) => dispatch(setFinishedOrders(orders))
})

export default function OrdersPage() {
    const [value, setValue] = useState("1");
    const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
        page: 1,
        limit: 3,
        orderStatus: OrderStatus.PAUSE
    })
    const history = useHistory();
    const { rebuildOrderData } = useGlobals()

    const {
        setPausedOrders,
        setProcessOrders,
        setFinishedOrders
    } = actionsDispatch(useDispatch())

    const { authMember } = useGlobals()

    useEffect(() => {
        if (!authMember) {
            history.push("/")
        } else {
            const orderSrevice = new OrderService();
            orderSrevice
                .getOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
                .then((orders: Order[]) => setPausedOrders(orders))
                .catch()

            orderSrevice
                .getOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
                .then((orders: Order[]) => setProcessOrders(orders))
                .catch()

            orderSrevice
                .getOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
                .then((orders: Order[]) => setFinishedOrders(orders))
                .catch()
        };
    }, [orderInquiry, rebuildOrderData])

    /** HANDLERS **/
    const paginationHandler = (e: T, page: number) => {
        orderInquiry.page = page;
        setOrderInquiry({ ...orderInquiry })
    }

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
        switch (newValue || value) {
            case "1":
                orderInquiry.orderStatus = OrderStatus.PAUSE;
                setOrderInquiry({ ...orderInquiry });
                break;
            case "2":
                orderInquiry.orderStatus = OrderStatus.PROCESS;
                setOrderInquiry({ ...orderInquiry })
                break;
            case "3":
                setOrderInquiry({ ...orderInquiry, orderStatus: OrderStatus.FINISH });
                break
            default:
                break
        }
    };

    return (
        <div className={"order-page"}>
            <Container className="order-container">
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    aria-label="basic tabs example"
                                    className={"table_list"}
                                >
                                    <Tab label="PAUSED ORDERS" value={"1"} />
                                    <Tab label="PROCESS ORDERS" value={"2"} />
                                    <Tab label="FINISHED ORDERS" value={"3"} />
                                </Tabs>
                            </Box>
                        </Box>
                        <Stack className={"order-main-content"}>
                            <PausedOrders setValue={setValue} />
                            <ProcessOrders setValue={setValue} />
                            <FinishedOrders />
                        </Stack>
                        <Stack flexDirection={"row"} justifyContent={"center"}>
                            <Pagination
                                count={orderInquiry.page + 1}
                                page={orderInquiry.page}
                                renderItem={(item) => (
                                    <PaginationItem
                                        components={{
                                            previous: ArrowBack,
                                            next: ArrowForward,
                                        }}
                                        {...item}
                                        color={"secondary"}
                                    />
                                )}
                                onChange={paginationHandler}
                            />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={authMember?.memberImage ? `${server}/${authMember.memberImage?.replace(/\\/g, "/")}` : "/icons/default-user.svg"}
                                    className={"order-user-avatar"}
                                />
                                <div className={"order-user-icon-box"}>
                                    <img
                                        src={authMember?.memberType === MemberType.RESTAURANT ? "/icons/restaurant.svg" : "/icons/user-badge.svg"}
                                        className={"order-user-prof-img"}
                                    />
                                </div>
                            </div>
                            <span className={"order-user-name"}>
                                {" "}
                                {authMember?.memberNick}
                            </span>
                            <span className={"order-user-prof"}>
                                {" "}
                                {"User"}
                            </span>
                        </Box>
                        <Box className={"liner"}></Box>
                        <Box className={"order-user-address"}>
                            <div style={{ display: "flex" }}>
                                <LocationOnIcon />
                            </div>
                            <div className={"spec-address-txt"}>
                                {"Do not exist"}
                            </div>
                        </Box>
                    </Box>
                    <Box className={"order-info-box"} sx={{ mt: "15px" }}>
                        <input
                            type={"text"}
                            name={"cardNumber"}
                            placeholder={"Card number : **** 4090 2002 7495"}
                            className={"card-input"}
                        />
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <input
                                type={"text"}
                                name={"cardPeriod"}
                                placeholder={"07 / 24"}
                                className={"card-half-input"}
                            />
                            <input
                                type={"text"}
                                name={"cardCVV"}
                                placeholder={"CVV : 010"}
                                className={"card-half-input"}
                            />
                        </div>
                        <input
                            type={"text"}
                            name={"cardCreator"}
                            placeholder={"Justin Robertson"}
                            className={"card-input"}
                        />
                        <div className={"cards-box"}>
                            <img src={"/icons/western-card.svg"} />
                            <img src={"/icons/master-card.svg"} />
                            <img src={"/icons/paypal-card.svg"} />
                            <img src={"/icons/visa-card.svg"} />
                        </div>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
