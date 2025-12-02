import {useEffect, useState} from "react";
import orderApi from "@/apis/order.js";
import {toast} from "react-toastify";

export const useOrder = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrderList = async () => {
            setLoading(true)
            setError(null)
            try {
                const res = await orderApi.getOrderByUserId()
                if (res.code === 1000)
                {
                    setOrders(res.result)
                }
                else {
                    toast.error(res.message)
                    throw new Error(res.message || "Lỗi không xác định")
                }
            }
            catch (err) {
                setError(err.message)
            }
            finally {
                setLoading(false)
            }
        }
        fetchOrderList().catch(console.error)
    }, []);

    return {orders, loading, error}
}