import React from "react";
import { Box, Button, Stack } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search.type";
import { Message, server } from "../../../lib/config";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useGlobals } from "../../hooks/useGlobals";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import OrderService from "../../services/Order.service";

interface BasketProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void,
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void
}
export default function Basket(props: BasketProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll
  } = props
  const { authMember, setRebuildOrderData } = useGlobals();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const productsPrice = cartItems.reduce((a: number, ele: CartItem) => a + ele.price * ele.quantity, 0)
  const deliveryCost = productsPrice > 100 ? 0 : 5
  const totalPrice = productsPrice + deliveryCost
  /** HANDLERS **/
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrderProceed = async () => {
    try {
      if (!authMember) throw new Error(Message.error2)
      handleClose()
      const orderService = new OrderService();
      await orderService.createOrder(cartItems);

      onDeleteAll()
      setRebuildOrderData(new Date())
      history.push("/orders")
    } catch (err: any) {
      await sweetErrorHandling(err)
    }
  }

  return (
    <Box className={"hover-line"}>
      <IconButton
        aria-label="cart"
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Badge badgeContent={cartItems.length} color="secondary">
          <img src={"/icons/shopping-cart.svg"} />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
        <Stack className={"basket-frame"}>
          <Box className={"all-check-box"}>
            {cartItems.length !== 0 ? (
              <Stack flexDirection={"row"} gap={"5px"}>
                <div>Cart products:</div>
                <DeleteForeverOutlined
                  sx={{ cursor: "pointer" }}
                  onClick={onDeleteAll}
                />
              </Stack>
            ) : (
              <div>Cart is empty!</div>
            )}

          </Box>

          <Box className={"orders-main-wrapper"}>
            <Box className={"orders-wrapper"}>
              {
                cartItems.map((item: CartItem) => {
                  const imagePath = `${server}/${item.image.replace(/\\/g, "/")}`
                  return (
                    <Box className={"basket-info-box"} key={item._id}>
                      <div className={"cancel-btn"}>
                        <CancelIcon
                          color={"primary"}
                          onClick={() => { onDelete(item) }}
                        />
                      </div>
                      <img src={imagePath} className={"product-img"} />
                      <span className={"product-name"}>{item.name}</span>
                      <p className={"product-price"}>${item.price} x {item.quantity}</p>
                      <Box sx={{ minWidth: 120 }}>
                        <div className="col-2">
                          <button className="remove"
                            onClick={() => {
                              onRemove(item)
                            }}
                          >-</button>{" "}
                          <button className="add"
                            onClick={() => {
                              onAdd(item)
                            }}
                          >+</button>
                        </div>
                      </Box>
                    </Box>
                  )
                })
              }
            </Box>
          </Box>
          <Box className={"basket-order"}>
            {
              cartItems.length !== 0 ? (
                <span className={"price"}>Total: ${totalPrice} ({productsPrice} +{deliveryCost})</span>
              ) : (
                <span className={"price"}>Total: $0 (0 +0)</span>
              )
            }
            <Button
              startIcon={<ShoppingCartIcon />}
              variant={"contained"}
              onClick={handleOrderProceed}
            >
              Order
            </Button>
          </Box>
        </Stack>
      </Menu>
    </Box>
  );
}
