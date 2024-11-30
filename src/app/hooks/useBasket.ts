import { useState } from "react";
import { CartItem } from "../../lib/types/search.type";

function useBasket() {
    const cartJson = localStorage.getItem("cartData");
    const currentCartItems = cartJson ? JSON.parse(cartJson) : [];
    const [cartItems, setCartItems] = useState<CartItem[]>(currentCartItems)

    const onAdd = (item: CartItem) => {
        const exist = cartItems.find((ele: CartItem) => ele._id === item._id)
        if (exist) {
            const cartUpdate = cartItems.map((ele: CartItem) => ele._id === item._id ? { ...ele, quantity: ele.quantity + 1 } : ele);
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartItems))
        } else {
            const cartUpdate = [...cartItems, item];
            setCartItems(cartUpdate);
            localStorage.setItem("cartData", JSON.stringify(cartUpdate))
        }
    }

    const onRemove = (item: CartItem) => {
        let cartUpdate;
        if (item.quantity === 1) {
            cartUpdate = cartItems.filter((ele: CartItem) => ele._id !== item._id)
            setCartItems(cartUpdate)
            localStorage.setItem("cartData", JSON.stringify(cartUpdate))
        } else {
            cartUpdate = cartItems.map((ele: CartItem) => ele._id === item._id ? { ...ele, quantity: ele.quantity - 1 } : ele);
            setCartItems(cartUpdate)
            localStorage.setItem("cartData", JSON.stringify(cartUpdate))
        }
    }
    const onDelete = (item: CartItem) => {
        const cartUpdate = cartItems.filter((ele: CartItem) => ele._id !== item._id)
        setCartItems(cartUpdate)
        localStorage.setItem("cartData", JSON.stringify(cartUpdate))
    }
    const onDeleteAll = () => {
        setCartItems([]);
        localStorage.removeItem("cartData")
    }

    return {
        cartItems,
        onAdd,
        onRemove,
        onDelete,
        onDeleteAll,
    }
}

export default useBasket