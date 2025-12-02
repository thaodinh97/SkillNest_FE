import {useState} from "react";
import cartApi from "@/apis/cart.js";

export function useAddToCart() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const addToCart = async (courseId, userId) => {
        try {
            setLoading(true)
            setError(null)
            const response = await cartApi.addToCart({courseId, userId})

            return response
        }
        catch (err) {
            setError(err.response?.message || "Không thể thêm vào giỏ hàng");
            throw err
        }
        finally {
            setLoading(false)
        }
    }
    return {addToCart, loading, error}
}