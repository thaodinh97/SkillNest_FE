import {useEffect, useState} from "react";
import {useAuth} from "@/features/auth/hooks/useAuth.js";
import cartApi from "@/apis/cart.js";
import {toast} from "react-toastify";
import {CartContext} from "./cart.context.js";

export const CartProvider = ({children}) => {
    const {user} = useAuth()
    const [cart, setCart] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCart = async () => {
            if (user) {
                setLoading(true)
                try {
                    const res = await cartApi.getCart()
                    setCart(res.result)
                }
                catch (error) {
                    console.error("Lỗi giỏ hàng: ", error)
                    setCart(null)
                }
                finally {
                    setLoading(false)
                }
            }
            else {
                setCart(null)
            }
        }
        fetchCart().catch(console.error)
    }, [user]);
    const itemCount = cart?.items?.length || 0
    const removeItemFromCart = async (itemId) => {
        setLoading(true)
        try {
            await cartApi.deleteItem(itemId)
            const res = await cartApi.getCart();
            setCart(res.result)
            toast.success("Đã xóa khỏi giỏ hàng.")
        }
        catch (error) {
            toast.error(error.message || "Lỗi khi xóa sản phẩm");
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <CartContext.Provider value={{cart, setCart, itemCount, loading, removeItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}