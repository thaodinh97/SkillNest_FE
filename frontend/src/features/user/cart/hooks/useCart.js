import {useContext} from "react";
import {CartContext} from "../context/cart.context.js";

export const useCart = () => {
    return useContext(CartContext);
};
