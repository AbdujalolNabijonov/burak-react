import React from "react";
import {
    Box,
    Button,
    Container,
    ListItemIcon,
    Menu,
    MenuItem,
    Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import { Logout } from "@mui/icons-material";


export default function OtherNavbar(props: any) {
    //Instalizations
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>();
    const open = Boolean(anchorEl)
    const authMember = null

    return (
        <div className="other-navbar">
            <Container className="navbar-container">
                <Stack className="menu">
                    <Box>
                        <NavLink to="/">
                            <img className="brand-logo" src="/icons/burak.svg" />
                        </NavLink>
                    </Box>
                    <Stack className="links">
                        <Box className={"hover-line"}>
                            <NavLink to="/">Home</NavLink>
                        </Box>
                        <Box className={"hover-line"}>
                            <NavLink to="/products" activeClassName={"underline"}>
                                Products
                            </NavLink>
                        </Box>
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/orders" activeClassName={"underline"}>
                                    Orders
                                </NavLink>
                            </Box>
                        ) : null}
                        {authMember ? (
                            <Box className={"hover-line"}>
                                <NavLink to="/member-page" activeClassName={"underline"}>
                                    My Page
                                </NavLink>
                            </Box>
                        ) : null}
                        <Box className={"hover-line"}>
                            <NavLink to="/help" activeClassName={"underline"}>
                                Help
                            </NavLink>
                        </Box>
                        <Basket />

                        {!authMember ? (
                            <Box>
                                <Button
                                    variant="contained"
                                    className="login-button"
                                >
                                    Login
                                </Button>
                            </Box>
                        ) : (
                            <img
                                className="user-avatar"
                                src={"/icons/default-user.svg"}
                                aria-haspopup={"true"}
                            />
                        )}

                        <Menu
                            anchorEl={anchorEl}
                            id="account-menu"
                            open={open}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: "visible",
                                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                    mt: 1.5,
                                    "& .MuiAvatar-root": {
                                        width: 32,
                                        height: 32,
                                        ml: -0.5,
                                        mr: 1,
                                    },
                                    "&:before": {
                                        content: '""',
                                        display: "block",
                                        position: "absolute",
                                        top: 0,
                                        right: 14,
                                        width: 10,
                                        height: 10,
                                        bgcolor: "background.paper",
                                        transform: "translateY(-50%) rotate(45deg)",
                                        zIndex: 0,
                                    },
                                },
                            }}
                            transformOrigin={{ horizontal: "right", vertical: "top" }}
                            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                        >
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" style={{ color: "blue" }} />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Stack>
                </Stack>
            </Container>
        </div>
    );
}
